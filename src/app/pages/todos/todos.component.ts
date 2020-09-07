import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TodosDataService } from 'src/app/cores/services/todos-data.service';
import { TodoItem } from 'src/app/cores/models/todos-interface';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @ViewChild('editTodoTemplate', null) editTodoTemplate: TemplateRef<any>; // template reference for the update modal
  editTodoModal: MatDialogRef<any>;
  public todoData: Array<TodoItem> = [];
  status: boolean;

  // form control object
  todoDetails: TodoItem = {
    title: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date(),
    // status: boolean;
  };

  constructor( private route: Router,
               private http: HttpClient,
               private todoDataService: TodosDataService,
               private _dialog: MatDialog,
               private _snackbar: MatSnackBar
               ) {

  }

  ngOnInit() {
    this.getTodos();

  }

  // method for getting all todos from Db
  getTodos() {
    return this.todoDataService.getTodo().subscribe(
      data => {

        this.todoData = data['msg'];
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


  // method for the todo task creation
  createtodos() {
    return this.route.navigate(['/dashboard/new-todos']);
  }

  // method for edit button
  EditTodo(todos) {
    this.todoDetails = todos;
    this.showEditTodoDialog();
  }


  // method for delete todo button
  deleteTodo(todos) {
    this.todoDataService.deleteTodo(todos._id).subscribe(data => {
      this.todoData.splice(this.todoData.indexOf(todos),1);
    });
  }

  myfunc(){
    //var me = new Date();
    //console.log(me.getDay());
    /*if(var1 === Date.now()){
      this.status ='true';
      console.log(`my date: `, Date.now());
    } else {
      this.status = 'false';
    }


    var amountInDays;
    const date1 = new Date(this.luxForm.get('checkInDate').value);
    const date2 = new Date(this.luxForm.get('checkOutDate').value);
    const daysInMiliseconds = 1000 * 60 * 60 * 24;
    const differenceInTime = date2.getTime() - date1.getTime();
    const daysDifference = differenceInTime / daysInMiliseconds;
    amountInDays = daysDifference;
    console.log(`the differnce in date is: `, amountInDays);

*/
  }

  // method for the update modal
  showEditTodoDialog() {
    this.editTodoModal = this._dialog.open(this.editTodoTemplate, {
       disableClose: true
    });
  }

  // method for saving the updated todo
  saveUpdatesToTodo(todo: TodoItem) {
    console.log('todo to update', todo);
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
    )
  }
}
