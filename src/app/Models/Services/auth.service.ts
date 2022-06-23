import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenPayload } from '../Interfaces/tokenPayload.interface';
import { UserDetails } from '../Interfaces/userDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private token: any;
  constructor(private http: HttpClient, private router: Router) { }




  public register (user: TokenPayload): Observable<any> {
    return this.http.post(`${environment.authUrl}/register`, user);
  }


  // User login endpoint interface

  public login(user): Observable<any> {
    return this.http.post(`${environment.authUrl}/login`, user);
  }


  // User generated token saved to local stroage

  public saveGeneratedToken(token: string): void {
    localStorage.setItem('user', token);
  }



  // Retrieving token from localStorage

  public getToken(): string {
      return localStorage.getItem('user');
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
    // console.log("User details returned ", user)
    if (user) {
      return user.name;
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
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user-login');
  }


  userLogin() {
    this.router.navigateByUrl('/user-login');
  }


}
