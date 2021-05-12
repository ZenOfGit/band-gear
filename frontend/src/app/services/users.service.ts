import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  addUser(user: User): void {
    let users = [];
    if(localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

}
