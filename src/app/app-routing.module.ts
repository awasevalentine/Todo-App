import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './pages/Auth/auth/logged-in.guard';
import { UserLoginComponent } from './pages/Auth/auth/user-login/user-login.component';
import { UserRegisterComponent } from './pages/Auth/auth/user-register/user-register.component';
import { DashboardComponent } from './pages/Components/components/dashboard/dashboard.component';
import { ImportantComponent } from './pages/Components/components/important/important.component';
import { NewTodoComponent } from './pages/Components/components/new-todo/new-todo.component';
import { PageLayoutComponent } from './pages/Components/components/page-layout/page-layout.component';
import { PlannedComponent } from './pages/Components/components/planned/planned.component';
import { TodosComponent } from './pages/Components/components/todos/todos.component';


const routes: Routes = [
  {
    path: 'user-register', component: UserRegisterComponent
  },
  {
    path: 'user-login', component: UserLoginComponent
  },
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
        path: 'new-todos', component: NewTodoComponent
      },
      {
        path: 'important', component: ImportantComponent, canActivate: [ LoggedInGuard ]
      },
      
      {
        path: 'plan', component: PlannedComponent, canActivate: [ LoggedInGuard ]
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
