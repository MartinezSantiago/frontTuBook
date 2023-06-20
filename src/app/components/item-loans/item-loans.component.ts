import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-item-loans',
  templateUrl: './item-loans.component.html',
  styleUrls: ['./item-loans.component.css']
})
export class ItemLoansComponent implements OnInit {
  @Input() loan: any;
  book: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBookDetails();
  }

  fetchBookDetails() {
    const bookId = this.loan.bookId;

    // Make the API request to fetch the book details
    this.http.get<any>(`https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/books/${bookId}`).subscribe(
      response => {
        this.book = response;
        console.log(this.book);
      },
      error => {
        console.error('Error fetching book details:', error);
      }
    );
  }
  openModal() {
    Swal.fire({
      title: 'Loan Details',
      html: `
        <p><strong>Title:</strong> ${this.book.title}</p>
        <p><strong>Author:</strong> ${this.book.author}</p>
        <p><strong>Price:</strong> ${this.loan.price}</p>
        <p><strong>Quantity:</strong> ${this.loan.quantity}</p>
        <p><strong>Surcharge:</strong> ${this.loan.surcharge}</p>
        <p><strong>Loan Date:</strong> ${this.formatDate(this.loan.loanDate)}</p>
        <p><strong>Due Date:</strong> ${this.formatDate(this.loan.dueDate)}</p>
        <p><strong>Return Date:</strong> ${this.formatDate(this.loan.returnDate)}</p>
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: 'OK'
    });
  }
  formatDate(date: string): any {
   if(date!==null){
    const loanDate = new Date(date);
    return loanDate.toLocaleDateString();
   } return "Still in possession"
  }
}
