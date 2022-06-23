import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridePlugin from '@fullcalendar/timegrid'; // a plugin

import { TodoItem } from 'src/app/Models/Interfaces/todos.interface';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';
import { AuthService } from 'src/app/Models/Services/auth.service';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.css']
})
export class PlannedComponent implements OnInit {
  @ViewChild('fullcalendar', null) fullcalendar: FullCalendarComponent;
  calendarPlugins=[dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridePlugin, listPlugin];
  public todoData: Array<TodoItem> = [];
  loggedInUser: any = {};
  constructor(private todoDataService: TodoDataService, private _authService: AuthService) {

  }

  ngOnInit() {


    this.loggedInUser = this._authService.getUserDetails();
    this.getTodos();

    //this.calendarPlugins = [dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridePlugin, listPlugin];
  }


  getTodos() {
    return this.todoDataService.getTodosByUserId(this.loggedInUser.userId).subscribe(
      data => {

        this.todoData = data;
      });
  }

  getEventsForCalendar(todos: Array<TodoItem>) {
    const calendarEvents = todos.map(todo => {
      return { title: todo.title, start: todo.startDate, end: todo.dueDate }
    });
    return calendarEvents;
  }
  mycolour(todos: Array<TodoItem>) {
    const data = todos.map(data => {
      const today = new Date();
      const startDate = new Date(data.startDate);
      const duedate = new Date(data.dueDate);
      if (today.getDate() < startDate.getDate()) {
        return { 'color': 'red' };
      }
      if (today.getDate() >= startDate.getDate() && today.getDate() <= duedate.getDate()) {
        return { 'color': "black" };
      }
      return { "color": "yellow" };
    })

    return data;
  }

}
