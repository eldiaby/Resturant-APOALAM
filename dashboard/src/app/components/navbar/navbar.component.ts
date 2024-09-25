import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  openNav: boolean = false;

  open() {
    this.openNav = true;
  }
  close() {
    this.openNav = false;
  }
  constructor(private _authService: AuthService) {}
  logout() {
    this._authService.logout();
    window.location.reload();
  }
}
