import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
  }


  login() {
    this.authService.login(this.email.value, this.password.value).then(cred => {
      this.router.navigateByUrl('/recipes');
    }).catch(error => {
      console.error(error);
    });
  }


  ngOnDestroy() {

  }
}

