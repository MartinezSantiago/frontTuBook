import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  openModal = () => {
    Swal.fire({
      title: `<strong class="pt-5">notifications</strong>`,
      width: 1200,
      html: `
        Vacio
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Notificaciones!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

}
