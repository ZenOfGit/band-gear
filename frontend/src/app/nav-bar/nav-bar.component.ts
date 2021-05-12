import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedInUser: string;

  constructor(private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  loggedIn() {
    this.loggedInUser = localStorage.getItem('token');
    return this.loggedInUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.alertifyService.success('You have logged out');
  }

}
