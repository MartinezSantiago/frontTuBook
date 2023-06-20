import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  booksData: any;
  searchValue: any = '';
  booksDataCategories: any;
  booksSearch: any;
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
  getBooks = async () => {
    this.http.get('https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/books').subscribe((data) => {
      this.booksData = Array.isArray(data) && data.sort((a: any, b: any) => a.title.localeCompare(b.title));
      this.booksDataCategories = Array.isArray(data) && data.sort((a: any, b: any) => a.title.localeCompare(b.title));;
    });
  };
  onSearchChange() {
    console.log(this.searchValue);
    this.booksSearch = this.booksData?.filter((item:any) => {
      return item?.title?.toLowerCase().includes(this.searchValue.toLowerCase());
    })
  }

  getBooksCate = (btnValue: any) => {
    this.http.get('https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/books').subscribe((data) => {
      if(btnValue=="all") {
        this.booksDataCategories = Array.isArray(data) && data.sort((a: any, b: any) => a.title.localeCompare(b.title));;
      } else {
        this.booksDataCategories = Array.isArray(data) && data.sort((a: any, b: any) => a.title.localeCompare(b.title));;
        this.booksDataCategories = this.booksData.filter(
          (book: any) => book.genre == btnValue
        );
      }
      
    });
  };

  ngOnInit() {
    this.getBooks();
    this.getUser();
  }
}
