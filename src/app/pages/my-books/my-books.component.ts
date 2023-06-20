import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  loans: any;
  searchValue: any = '';
  loansSearch: any;
  user: any;


  constructor(private http: HttpClient) {}

  async getUser() {
    try {
      this.user = await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.error('Error retrieving user:', error);
      this.user = null;
    }
  };
   async fetchUserLoans() {
    const user=await Auth.currentAuthenticatedUser() ;
    const userId=user.attributes.sub;
    // Make the API request to fetch the loans of the user
    this.http.get<any>(`https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/loans/getUserLoans/${userId}`).subscribe(
      response => {
        this.loans = response;
        console.log(userId);
      console.log(this.loans)      
    },
      error => {
        console.error('Error fetching user loans:', error);
      }
    );
  }
  onSearchChange() {
    console.log(this.searchValue);
    this.loansSearch = this.loans?.filter((item:any) => {
      return item?.title?.toLowerCase().includes(this.searchValue.toLowerCase());
    })
  }
  

  ngOnInit() {
    this.fetchUserLoans();
    this.getUser();
   }
 
}
