import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoItem } from 'src/app/cores/models/todos-interface';
import { TodosDataService } from 'src/app/cores/services/todos-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-new-todos',
  templateUrl: './new-todos.component.html',
  styleUrls: ['./new-todos.component.css']
})
export class NewTodosComponent implements OnInit {

  // object for form control
  todoDetails: TodoItem = {
    title: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date(),
    // status: boolean;
  };

  constructor(private route: Router,
              private todosDataService: TodosDataService,
              private _snackbar: MatSnackBar,
              private http: HttpClient) {
  }

  ngOnInit() {

  }

  // method for the form submission
  newTodosForm() {
    this.todosDataService.postTodo(this.todoDetails, ).subscribe();
    this._snackbar.open('New todo saved ', 'Ok', {horizontalPosition: 'right', verticalPosition: 'bottom'});
    return this.route.navigate(['dashboard/task']);

}
}
