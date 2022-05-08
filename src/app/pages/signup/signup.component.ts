import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signUpForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  loading: boolean = false;
  loadingSubscription?: Subscription;


  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        userName: this.signUpForm.get('userName')?.value,
        email: this.signUpForm.get('email')?.value
      }
      this.userService.create(user).then(_ => {
        this.router.navigateByUrl('/recipes');
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });

  }

  navigateBack() {
    this.location.back();
  }

}
