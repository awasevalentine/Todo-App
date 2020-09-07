import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppmaterialModule } from './modules/appmaterial/appmaterial.module';
import { NewTodosComponent } from './pages/new-todos/new-todos.component';
import { PageLayoutComponent } from './pages/page-layout/page-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TodosComponent } from './pages/todos/todos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodosDataService } from './cores/services/todos-data.service';
import { ImportantComponent } from './pages/important/important.component';
import { TodoUpdateComponent } from './pages/todo-update/todo-update.component';
import { MyhoverDirective } from './cores/myhover.directive';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AuthService } from './authentication/services/auth.service';
import { LoggedInGuard } from './authentication/Guard/logged-in.guard';
import { ActivatedRouteSnapshot } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NewTodosComponent,
    PageLayoutComponent,
    DashboardComponent,
    TodosComponent,
    ImportantComponent,
    TodoUpdateComponent,
    MyhoverDirective,
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TodosDataService, AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
