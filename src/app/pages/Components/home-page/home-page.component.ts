import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Models/Services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
public isLoggedIn

  constructor(private router: Router, private _authService: AuthService) { }



  ngOnInit() {

    this.isLoggedIn = this._authService.isLoggedIn()
  }

  onStartButtonClicked() {
    if(this.isLoggedIn){
      this.router.navigateByUrl('/dashboard')
    }
    else{
      this.router.navigate(['/user-login']);
    }
  }

}
