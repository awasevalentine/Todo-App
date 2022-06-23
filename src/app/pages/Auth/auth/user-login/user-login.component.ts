import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Models/Services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  showPassword: boolean

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private _snackbar: MatSnackBar) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }


  showPasswordText(){
    this.showPassword = !this.showPassword
  }
  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe((data) => {
      if(data.accessToken){
        this.authService.saveGeneratedToken(data.accessToken);
        this.router.navigateByUrl('/dashboard');
        this._snackbar.open('User successfully logged in', 'Ok', { horizontalPosition: 'right', verticalPosition: 'top', duration: 2000 });
        return;
      }
      else{
        this._snackbar.open(data.message, 'Ok', { horizontalPosition: 'right', verticalPosition: 'top', duration: 2000});
      }

      });

  }
}
