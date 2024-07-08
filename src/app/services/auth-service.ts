import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.APIUrl;

//Set Headers
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //Login Method
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  //Register Method
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  //logout method
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
