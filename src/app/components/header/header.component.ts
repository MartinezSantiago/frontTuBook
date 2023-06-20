import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  async getUser() {
    try {
      await Auth.currentAuthenticatedUser();
      this.isAuthenticated = true;
    } catch (error) {
      console.error('Error retrieving user:', error);
      this.isAuthenticated = false;
    }
  }

  logOut() {
    Auth.signOut()
      .then(() => {
        this.isAuthenticated = false;
        window.location.href = '/login';
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  }

  ngOnInit() {
    this.getUser();
  }
}
