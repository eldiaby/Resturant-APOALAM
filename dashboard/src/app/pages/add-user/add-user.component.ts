import { UsersService } from './../../services/users.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  router = inject(Router);
  showMessage: any = false;
  message: any = '';
  constructor(private _usersService: UsersService) {}

  addUser() {
    if (this.addUserForm.valid === false) {
      this.addUserForm.markAllAsTouched();
    } else {
      this._usersService.addUser(this.addUserForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.message = 'user added successfuly';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
            this.message = '';
            this.router.navigate(['/users']);
          }, 2000);
        },
        error: (err) => {
          console.log(err.error.message);
          this.message = err.error.message;
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
            this.message = '';
          }, 2000);
        },
      });
    }
  }
  addUserForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
}
