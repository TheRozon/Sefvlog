import { Component, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  page = '';
  routes: Array<string> = [];
  loggedUser?: firebase.default.User | null;
  @Output() noMenu: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((events: any) => {
      const currentPage = (events.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
        if (currentPage == "not-found") {
          this.noMenu = true;
        }

      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedUser));
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
      console.error(error);
    });
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);

  }

  onToogleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully!');
    }).catch(error => {
      console.error(error);
    });
  }

}
