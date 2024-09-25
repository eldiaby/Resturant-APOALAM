import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  router = inject(Router);
  showErr: boolean = false;
  showSucc: boolean = false;
  err: string = '';
  success: string = '';
  token: string = '';
  userName: string = '';
  loading: boolean = false;

  constructor(private _authService: AuthService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  login() {
    this.loading = true;
    if (this.loginForm.valid == false) {
      this.loading = false;
      this.loginForm.markAllAsTouched();
    } else {
      this._authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          this.userName = res.message.slice(7);
          this.loading = false;
          this.showSucc = true;
          this.success = 'Login successful';
          setTimeout(() => {
            this.showSucc = false;
          }, 2000);
          setTimeout(() => {
            // this.router.navigate(['/home']);
            window.location.reload();
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.err = err.error.message;
          this.showErr = true;
          setTimeout(() => {
            this.showErr = false;
          }, 2000);
        },
      });
    }
  }
}
