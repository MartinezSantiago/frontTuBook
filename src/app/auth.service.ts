import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://bk48t1027l.execute-api.us-east-1.amazonaws.com/dev/users';
  private readonly USER_KEY = 'user';
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    try {
      const user = Auth.currentAuthenticatedUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }
  register(idCognito: string, email: string): Promise<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { idUser: idCognito, email: email };
  console.log("hola")
    return this.http.post<any>(this.API_URL, body, { headers: headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => error);
  }
  getUser(id: string): Promise<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.get<any>(`${this.API_URL}/${id}`, { headers: headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => error);
  }
  
}
