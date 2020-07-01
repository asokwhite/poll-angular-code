import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'polling';

  constructor(private router: Router) {

  }

  routeToAdmin() {
    this.router.navigate(['admin']);
  }

  clickHandler(field) {
    const token = localStorage.getItem('token');
    if(field == 'login') {
      return token ? false : true;
    }
    return token ? true : false;
  }
  
  routeHandler(route) {
    return this.router.url !== route;
  }

  routeToPage(field) {
    if(field == 'login' || field == 'logout') {
      localStorage.clear();
      this.router.navigate(['login']);
    } else if(field == 'polling') {
      this.router.navigate(['']);
    } else if(field == 'admin') {
      this.router.navigate(['admin']);
    }
   }
}
