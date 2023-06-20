import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Auth } from 'aws-amplify';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-book',
  templateUrl: './item-book.component.html',
  styleUrls: ['./item-book.component.css'],
})
export class ItemBookComponent {
  @Input() book: any;
  user:any
  qty:any
  constructor(private http: HttpClient) {}

  async getUser() {
    try {
      this.user = await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.error('Error retrieving user:', error);
      this.user = null;
    }
  };
  openModal = () => {this.user= this.getUser();
    console.log(this.book);
    Swal.fire({
      title: `<strong class="pt-5">${this.book.title}</strong>`,
      width: 1200,
      html: `
        <img src="${this.book.bookCover}" width="fit-content" height="400px" alt="">
        <p>${this.book.price}</p>
        <input type="number" id="qty" required>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: '❌',
      confirmButtonText: 'Alquilar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.book);
        this.qty = document.getElementById('qty');
        const headers = new HttpHeaders().set(
          'Content-Type',
          'application/json'
        );
        const body = {
          idBook: this.book.id,
          idUser: this.user.attributes.sub,
          dueDate: new Date(),
          price: 15,
          loanDate: new Date(),
          quantity: 1,
        };
        const resp = this.http
          .post<any>(`https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/loans`, body, {
            headers: headers,
          })
          .toPromise()
          .then((response) => {
            /* return response.user; */
            console.log(response);
          })
          .catch((error) => error);

        /* loans/create  () */
        console.log(
          this.qty?.addEventListener('change', (e:any) => {
            console.log(e.target.value);
          })
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Total: ${this.qty?.addEventListener('change', (e:any) =>console.log(e.target.value))}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info');
      }
    });
  };
}
