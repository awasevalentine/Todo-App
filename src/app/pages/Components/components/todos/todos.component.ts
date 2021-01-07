import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TodoItem } from 'src/app/Models/Interfaces/todos.interface';
import { AuthService } from 'src/app/Models/Services/auth.service';
import { TodoDataService } from 'src/app/Models/Services/todo-data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  // template reference for the update modal
  @ViewChild('editTemplateModal', null) editTemplateModal: TemplateRef<any>; 
  editTodoModal: MatDialogRef<any>;

  // container for to hold the returned data from Db
  public todoData: Array<TodoItem> = [];
  today = new Date();

  // form-control object for editing update

  todoDetails: TodoItem = {
    title: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date(),
    userId: ''
  };

  // variable for returned logged in useer from authService
  loggedInUser: any = {};

  constructor(private route: Router,
    private todoDataService: TodoDataService,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private _authService: AuthService) { }

  

  ngOnInit() {

    // initiating logged in user returned from Db

    this.loggedInUser = this._authService.getUserDetails();
    if(!this.loggedInUser) {
      this.route.navigateByUrl('/user-login');
    } else {
      this.getTodos(this.loggedInUser._id);
    }

  }



  // method for the todo task creation
  createtodos() {
    return this.route.navigate(['/dashboard/new-todos']);
  }


  // method for getting a particularn user todos from Db
  
  getTodos(userId) {
    return this.todoDataService.getTodosByUserId(userId).subscribe(
      data => {

        this.todoData = data;
        //this.todoData = data.filter(d => d["_id"] === userId);
  });
}


// method for selecting important

  onSelect(todo: TodoItem): void {
    // const todoRecord = this.todoDataService.getTodoItem(todo._id);
    if (todo.important) {
      todo.important = false;
      this.todoDataService.removeFromImportantTodos(todo._id,todo);
    } else {
      todo.important = true;
      this.todoDataService.setImportantTodo(todo);
    }
  }


  // method for edit button

  EditTodo(todos) {
    this.todoDetails = todos;
    this.showEditTodoDialog();
  }


   // method for the update todo modal
  
   showEditTodoDialog() {
    this.editTodoModal = this._dialog.open(this.editTemplateModal, {
      disableClose: false,
     
    });
  }


  // method for delete todo button

  deleteTodo(todos) {
    this.todoDataService.deleteTodo(todos._id).subscribe(data => {
      this.todoData.splice(this.todoData.indexOf(todos),1);
    });
  }

  trackById(index:number, data: any) {
    return  data._id;
  }

 

  // method for saving the updated todo

  saveUpdatesToTodo(todo: TodoItem) {
    this.todoDataService.updateTodo(todo._id, todo).subscribe(
      (response) => {
        this._snackbar.open(`Successfully saved changes to ${todo.title}`, 'Ok', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.editTodoModal.close();
      },
      (e) => {
        this._snackbar.open(`Failed to save changes to ${todo.title}`, 'Ok', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      }
    );
  }


  // method for status state

  displayTaskStatus(todo: TodoItem): string {
    const today = new Date();
    const startDate = new Date(todo.startDate);
    const duedate = new Date(todo.dueDate);
    if (today.getDate() < startDate.getDate()) {
      return "Scheduled";
    }
    if(today.getDate() >= startDate.getDate() && today.getDate() <= duedate.getDate()) {
      return "In-Progress";
    }
    return "Completed";
  }
}
