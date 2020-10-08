import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Models/Services/auth.service';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  message: string;
  menuItems: any[];
  events: String[] = [];
  opened: boolean;

  importantTaskCount: number;

  constructor(private _todoService: TodoDataService,
              public authService: AuthService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private router: Router
  ) {
    this.message = "";
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit() {
    if(this.authService.isLoggedIn){
    this.router.navigateByUrl('/dashboard/task');
    } else {
      this.router.navigateByUrl('/user-login');
    }
   setInterval(
      ()=> {
        this.mylogic();
      }, 1000);
  }

  mylogic() {
    this._todoService.getImportantTodos().then(
      (importantTodos) => {
        this.importantTaskCount = importantTodos.length;
      }
    );
    // this.importantTaskCount = this._todoService.getmyImportant().length;
  }

  login() {
    this.authService.userLogin();
  }


  logout(): boolean {
    this.authService.logOut();
    return false;
    }

  
  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}