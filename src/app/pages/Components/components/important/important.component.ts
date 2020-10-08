import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoItem } from 'src/app/Models/Interfaces/todos.interface';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css']
})
export class ImportantComponent implements OnInit {
  todoData: TodoItem[] = [];
  constructor(private todoDataService: TodoDataService, private _snackbar: MatSnackBar) { }

  ngOnInit() {
    this.todoDataService.getImportantTodos().then(
      (response) => {
        this.todoData = response;
      },
      (errors) => {
        this._snackbar.open('Failed to fetch important todos', 'Ok', {verticalPosition: 'bottom', horizontalPosition: 'right'});
      }
    )

  }

}
