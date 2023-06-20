import { Component } from '@angular/core';
import { Auth} from 'aws-amplify';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  verificationCode: string = '';

  constructor(private http: HttpClient,private authService:AuthService) {}

  async login() {
    try {
      // Sign in with email and password
      const user = await Auth.signIn(this.email, this.password);
console.log(user);
      if (user.challengeName!= 'MFA_SETUP') {
        // TOTP is already set up for the user, prompt for authentication code
        Swal.fire({
          icon: 'info',
          title: 'Enter Authentication Code',
          html: '<p>Please enter your authentication code:</p>',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Verify',
          showLoaderOnConfirm: true,
          preConfirm: async (verificationCode) => {
            try {
              await Auth.confirmSignIn(user, verificationCode, "SOFTWARE_TOKEN_MFA");
              window.location.replace("");
              // Token verification successful
              Swal.fire({
                icon: 'success',
                title: 'Token Verified',
                text: 'Authentication successful!',
              });

            } catch (error) {
              // Token verification failed
              Swal.fire({
                icon: 'error',
                title: 'Token Verification Failed',
                text: 'Authentication failed. Please try again.',
              });
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
      } else {
        // Setup TOTP for the user
        const code = await Auth.setupTOTP(user);
        const qrCodeApiUrl = `https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/qrcode`;
        const params = {
          secretCode: code,
          userId:user.username,
          username:this.email,
        };

        // Make GET request to retrieve the URL of the QR code image
      this.http.get<{ imageUrl: string }>(qrCodeApiUrl, { params }).subscribe(response => {
          const qrCodeImageUrl = response.imageUrl;

          Swal.fire({
            icon: 'success',
            title: 'Sign-In Successful',
            html: `<p>Scan QR to authenticate</p><img src="${qrCodeImageUrl}" alt="QR Code" width="200" height="200" />`,
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Verify',
            showLoaderOnConfirm: true,
            preConfirm: async (verificationCode) => {
              try {


                await Auth.verifyTotpToken(user, verificationCode);
                Auth.setPreferredMFA(user, 'TOTP');
                window.location.replace("");
                // Token verification successful
                Swal.fire({
                  icon: 'success',
                  title: 'Token Verified',
                  text: 'Authentication successful!',
                });
              } catch (error) {
                // Token verification failed
                Swal.fire({
                  icon: 'error',
                  title: 'Token Verification Failed',
                  text: 'Authentication failed. Please try again.',
                });
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          });
        });

        // Display the secret code to the user
        console.log('QR Code:', code);
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Sign In',
      });
    }
  }
}
