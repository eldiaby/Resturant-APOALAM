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
  constructor(private _usersService: UsersService) {}

  addUser() {
    if (this.addUserForm.valid === false) {
      this.addUserForm.markAllAsTouched();
    } else {
      this._usersService.addUser(this.addUserForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.log(err);
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
