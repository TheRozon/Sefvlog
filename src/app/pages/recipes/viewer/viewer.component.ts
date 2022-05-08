import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Image } from '../../../shared/models/Image';
import { Comment } from '../../../shared/models/Comments';
import { RecipesService } from '../../../shared/services/recipes.service';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;
  comments: Array<any> = [];
  clickedImage: boolean = false;
  user?: User


  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: new Date(),
    recipeId: this.imageInput?.id

  });

  constructor(
    private formBuilder: FormBuilder,
    private recipesService: RecipesService,
    private commentService: CommentService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.read(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.userName);
    }, error => {
      console.error(error);
    });
  }

  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.commentsForm.get('recipeId')?.setValue(this.imageInput.id);
      this.recipesService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;
      });
      this.commentService.recipeIdComments(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  createForm(model: Comment) {
    let formGroup = this.formBuilder.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.minLength(2), Validators.required]);
    return formGroup;
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date());
        this.commentService.create(this.commentsForm.value).then(_ => {

        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  deleteComment() {

  }
  clickImage() {
    this.clickedImage = true;
  }


}


