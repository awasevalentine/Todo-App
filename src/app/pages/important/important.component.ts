import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TodoItem } from 'src/app/cores/models/todos-interface';
import { TodosDataService } from 'src/app/cores/services/todos-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css']
})
export class ImportantComponent implements OnInit {

  todoData: TodoItem[] = [];
  constructor(private todoDataService: TodosDataService, private _snackbar: MatSnackBar) { }

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
