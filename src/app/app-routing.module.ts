import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageLayoutComponent } from './pages/page-layout/page-layout.component';
import { TodosComponent } from './pages/todos/todos.component';
import { NewTodosComponent } from './pages/new-todos/new-todos.component';
import { ImportantComponent } from './pages/important/important.component';
import { TodoUpdateComponent } from './pages/todo-update/todo-update.component';
import { LoginComponent } from './authentication/login/login.component';
import { LoggedInGuard } from './authentication/Guard/logged-in.guard';


const routes: Routes = [
  {
    path: '', component: PageLayoutComponent
  },
  {
    path: 'dashboard', component: PageLayoutComponent,
    children: [
      {
        path: '', component: DashboardComponent
      },
      {
        path: 'task', component: TodosComponent, canActivate: [ LoggedInGuard ]
      },
      {
        path: 'new-todos', component: NewTodosComponent
      },
      {
        path: 'important', component: ImportantComponent
      },
      {
        path: 'update', component: TodoUpdateComponent
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
