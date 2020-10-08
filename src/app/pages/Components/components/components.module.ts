import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportantComponent } from './important/important.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PlannedComponent } from './planned/planned.component';
import { TodosComponent } from './todos/todos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/Global-Modules/angular-material/angular-material.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ImportantComponent,
    NewTodoComponent,
    PageLayoutComponent,
    PlannedComponent,
    TodosComponent],
  
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AngularMaterialModule,
    AppRoutingModule,
  ]
})
export class ComponentsModule { }
