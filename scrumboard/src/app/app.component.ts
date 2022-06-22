import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'scrumboard';

  constructor(readonly authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/home')
    });
  }
}
