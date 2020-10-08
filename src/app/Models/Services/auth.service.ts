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

  constructor( private http: HttpClient, private router: Router) { 

  }

  public register (user: TokenPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }


  public login(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, user);
  }


  public saveGeneratedToken(token: string): void {
    localStorage.setItem('mean-token', token);
    // this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

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


  getUser(): any {
    const user = this.getUserDetails();
    if (user) {
      return user.userName;
    } else {
      return null;
    }
    }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public logOut(): void {
    this.token = localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/user-login');
  }
  

  userLogin() {
    this.router.navigateByUrl('/user-login');
  }


}
