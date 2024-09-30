import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  message: boolean = false;
  users: any[] = [];
  displayedUsers: any[] = [];
  totalPages: number = 0;
  page: number = 1;
  limit: number = 10;

  deleMessage: boolean = false;
  deleteDone: boolean = false;
  tempId: string = '';

  searchQuery: string = '';

  constructor(private _usersService: UsersService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  setPage(num: number) {
    if (num >= 1 && num <= this.totalPages) {
      this.page = num;
      this.paginateUsers();
    }
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.paginateUsers();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.paginateUsers();
    }
  }

  paginateUsers() {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.displayedUsers = this.users.slice(start, end);
  }

  deleteItem(id: string) {
    this.deleMessage = true;
    this.tempId = id;
  }

  closeMessage() {
    this.deleMessage = false;
  }

  deleteConfirm() {
    this.deleteUser(this.tempId);
    this.deleMessage = false;
    this.tempId = '';
    this.deleteDone = true;
    setTimeout(() => {
      this.deleteDone = false;
    }, 2000);
  }
  search(x: any) {
    this.searchQuery = x.target.value;

    if (this.searchQuery) {
      this.displayedUsers = this.users.filter((user) =>
        user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.paginateUsers();
    }
  }
  deleteUser(id: string) {
    this._usersService.deleteUser(id).subscribe({
      next: (res) => {
        this.message = true;
        this.users = this.users.filter((user: any) => user._id !== id);
        this.paginateUsers();
        setTimeout(() => {
          this.message = false;
        }, 2000);
      },
      error: (err) => {},
    });
  }

  getAllUsers() {
    this._usersService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res.allUsers);
        this.users = res.allUsers;
        this.totalPages = Math.ceil(this.users.length / this.limit);
        this.paginateUsers();
      },
      error: (err) => {
        // Handle error
        // console.log('ERR', err);
      },
    });
  }
}

// message: boolean = false;
// users: any = [];
// totalPage: any = null;
// page: any = 1;

// deleMessage: any = false;
// deleteDone: boolean = false;
// tempId: any = '';

// constructor(private _usersService: UsersService) {}

// ngOnInit() {
//   this.getAllUsers();
//   this.setPagin(this.page);
// }

// setPage(num: any) {
//   this.page = num;
//   this.setPagin(this.page);
// }
// next() {
//   this.page++;
//   this.setPagin(this.page);
// }
// prev() {
//   this.page--;
//   this.setPagin(this.page);
// }
// deleteItem(id: any) {
//   this.deleMessage = true;
//   this.tempId = id;
// }
// closeMaessage() {
//   this.deleMessage = false;
// }
// deleteConfirm() {
//   this.deleteUser(this.tempId);
//   this.users = this.users.filter((user: any) => user._id !== this.tempId);
//   this.deleMessage = false;
//   this.tempId = '';
//   this.deleteDone = true;
//   setTimeout(() => {
//     this.deleteDone = false;
//   }, 2000);
// }

// setPagin(num: any) {
//   if (num === 1) {
//     this.users = this.users.slice(0, 10);
//   } else if (num === 2) {
//     this.users = this.users.slice(10, 20);
//   } else if (num === 3) {
//     this.users = this.users.slice(20, 30);
//   } else if (num === 4) {
//     this.users = this.users.slice(30, 40);
//   }
// }
// deleteUser(id: any) {
//   this._usersService.deleteUser(id).subscribe({
//     next: (res) => {
//       this.message = true;
//       this.users = this.users.filter((user: any) => user._id !== id);
//       setTimeout(() => {
//         this.message = false;
//       }, 2000);
//     },
//     error: (err) => {
//       // console.log(err);
//     },
//   });
// }
// getAllUsers() {
//   this._usersService.getAllUsers().subscribe({
//     next: (res) => {
//       this.users = res.allUsers;
//     },
//     error: (err) => {
//       // console.log(err);
//     },
//   });
// }
