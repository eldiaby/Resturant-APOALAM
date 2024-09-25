import { UsersService } from './../../services/users.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  id: any = '';
  user: any = {};
  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getUserDetails();
  }

  getUserDetails() {
    this._usersService.getUser(this.id).subscribe({
      next: (res) => {
        this.user = res.User;
        this.updateUserForm.patchValue({
          userName: this.user.userName,
          email: this.user.email,
          phone: this.user.phone,
          address: this.user.address,
          role: this.user.role,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateUser() {
    this._usersService
      .updateUser(this.id, this.updateUserForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateUserForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
}
