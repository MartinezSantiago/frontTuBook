import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService:AuthService) { }

  async register() {
    try {
      const userCapture = await Auth.signUp({
        username: this.email,
        password: this.password
      });
  
      const { value: confirmationCode } = await Swal.fire({
        title: 'Code Verification',
        html: `
          <p>We sent a code to your email "${this.email}"</p>
          <p>Please enter the code here:</p>
          <input type="text" id="confirmationCode" class="swal2-input" required>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText: '❌',
        confirmButtonText: 'Confirm',
        preConfirm: () => {
          const codeInput = document.getElementById('confirmationCode') as HTMLInputElement;
          console.log('Confirmation code entered:', codeInput.value);
          return codeInput.value;
        }
      });
  
      if (!confirmationCode) {
        Swal.fire({
          icon: 'warning',
          title: 'Failed to Confirm Sign Up',
          text: 'Confirmation code cannot be empty.'
        });
        return;
      }
  
      await Auth.confirmSignUp(this.email, confirmationCode);
      console.log('Sign up confirmed successfully.');
      await this.authService.register(userCapture.userSub,this.email);
  Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your registration has been completed successfully.'
      });
      console.log('Registration successful.');
      console.log('Username:',  this.email);
    } catch (error) {
      console.log('Error registering', error);
      Swal.fire({
        icon: 'warning',
        title: 'Failed Register',
      });
    }
  }
  
}
