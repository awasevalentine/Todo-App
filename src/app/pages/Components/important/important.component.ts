import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoItem } from 'src/app/Models/Interfaces/todos.interface';
import { AuthService } from 'src/app/Models/Services/auth.service';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css']
})
export class ImportantComponent implements OnInit {
  loggedInUser: any = {};
  todoData: TodoItem[] = [];
  constructor(private todoDataService: TodoDataService,
    private _snackbar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser = this.authService.getUserDetails();
    this.todoDataService.getImportantTodos(this.loggedInUser.userId).then(
      (response) => {
        this.todoData = response;
      },
      (errors) => {
        this._snackbar.open('Failed to fetch important todos', 'Ok', {verticalPosition: 'bottom', horizontalPosition: 'right'});
      }
    )

  }

}
