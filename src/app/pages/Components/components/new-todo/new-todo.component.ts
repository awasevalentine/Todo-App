import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TodoItem } from 'src/app/Models/Interfaces/todos.interface';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  // object for form control
  todoDetails: TodoItem = {
    title: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date(),
    // status: boolean;
  };

  constructor(private route: Router,
    private todoDataService: TodoDataService,
    private _snackbar: MatSnackBar,
    private http: HttpClient) {
  }

  ngOnInit() {

  }

  // method for the form submission
  newTodosForm() {
    this.todoDataService.postTodo(this.todoDetails,).subscribe();
    this._snackbar.open('New todo saved ', 'Ok', { horizontalPosition: 'right', verticalPosition: 'bottom' });
    return this.route.navigate(['dashboard/task']);


  }
}