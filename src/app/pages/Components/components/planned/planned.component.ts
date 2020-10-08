import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list'; 
import timeGridePlugin from '@fullcalendar/timegrid'; // a plugin
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TodoItem } from 'src/app/Models/Interfaces/todos.interface';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.css']
})
export class PlannedComponent implements OnInit {
  @ViewChild('fullcalendar', null) fullcalendar: FullCalendarComponent;
  calendarPlugins;
    public todoData: Array<TodoItem> = [];
  constructor( private todoDataService: TodoDataService) { 
    const name = Calendar.name;
  }

  ngOnInit() {
    this.getTodos();

    this.calendarPlugins = [dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridePlugin, listPlugin];
  }


  getTodos() {
    return this.todoDataService.getTodo().subscribe(
      data => {

        this.todoData = data;
  });
}
}
