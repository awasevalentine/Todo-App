import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenPayload } from '../Interfaces/tokenPayload.interface';
import { UserDetails } from '../Interfaces/userDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;
  public baseUrl = 'http://localhost:3300/auth';
 // private baseUrl = 'https://barrondy-todo-app.herokuapp.com/auth';

  constructor(private http: HttpClient, private router: Router) { }


  

  public register (user: TokenPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }


  // User login endpoint interface

  public login(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, user);
  }


  // User generated token saved to local stroage

  public saveGeneratedToken(token: string): void {
    localStorage.setItem('mean-token', token);
    // this.token = token;
  }



  // Retrieving token from localStorage

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }


  // Splitting token in order to extract user details

  public getUserDetails(): UserDetails{
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  

// Returning a bearer user name from splitted token
  
  getUser(): any {
    const user = this.getUserDetails();
    if (user) {
      return user.userName;
    } else {
      return null;
    }
    }


    // Method for checking user logged in state

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  // Method to log a particular user out
  public logOut(): void {
    this.token = localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/user-login');
  }
  

  userLogin() {
    this.router.navigateByUrl('/user-login');
  }


}
