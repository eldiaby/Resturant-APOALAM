import { UsersService } from './../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  router = inject(Router);
  id: any = '';
  user: any = {};
  message: boolean = false;
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
  deleteUser(id: any) {
    this._usersService.deleteUser(id).subscribe({
      next: (res) => {
        this.message = true;
        setTimeout(() => {
          this.message = false;
          this.router.navigate(['/users']);
        }, 2000);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
  getUserDetails() {
    console.log(this.id);
    this._usersService.getUser(this.id).subscribe({
      next: (res) => {
        this.user = res.User;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
