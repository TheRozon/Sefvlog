import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipesObject?: Array<Image>;
  chosenImage?: Image;

  constructor(
    private recipesService: RecipesService
  ) {
  }

  ngOnInit(): void {
    this.recipesService.loadImageMeta('__recipes.json').subscribe((data: Array<Image>) => {
      console.log(data);
      this.recipesObject = data;
    })
  }

  reload() {

  }
  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
  }
}
