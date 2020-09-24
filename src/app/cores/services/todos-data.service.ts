import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { TodoItem } from '../models/todos-interface';

@Injectable({
  providedIn: 'root'
})
export class TodosDataService {

  private apiUrl = 'https://barrondy-todo-app.herokuapp.com/todo/api';
  //private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private myImportant: TodoItem[] = [];


  constructor(private http: HttpClient) {
   }

   /*myregister(myvalue){
     return this.http.post(`http://localhost:3000/user/register`, myvalue);
   }*/

getTodo(){
  return this.http.get<any>(`${this.apiUrl}/getTodos`/*,{ headers: this.headers}*/);
}
getImportantTodos(): Promise<TodoItem[]> {
  return new Promise<TodoItem[]>((resolve, reject) => {
    this.getTodo().subscribe(
      (todos) => {
        // console.log(`retured todos on get important function`, todos);
        const importantTodos = todos.filter(td => td.important);
        resolve(importantTodos);
      },
      (error) => {
        reject(error);
      }
    );
  });


}
getTodoById(id: any) {
  return this.http.get<any>(`${this.apiUrl}/getTodo/${id}`/*,{ headers: this.headers}*/);
}

deleteTodo(id: string) {
  return this.http.delete<TodoItem[]>(`${this.apiUrl}/deleteTodo/${id}`/*, { headers: this.headers}*/);
}

updateTodo(id, todo: TodoItem) {
  return this.http.put<TodoItem[]>(`${this.apiUrl}/updateTodo/${id}`, todo/*, {headers: this.headers}*/);

}

postTodo(todo: TodoItem) {
  return this.http.post<TodoItem[]>(`${this.apiUrl}/createTodo`, todo/*, {headers: this.headers}*/);
}

setImportantTodo(todo: TodoItem) {
  this.updateTodo(todo._id, todo).subscribe(
    (res) => {
    },
    (error) => {
      console.log('error occured while setting todo status to important');
    }
  );

}
/*getTodoItem(id: string): TodoItem {
  let todo = this.myImportant.find(td => td._id == id);
  return todo;
}*/
removeFromImportantTodos(id: any, todo: TodoItem): boolean {
  this.updateTodo(todo._id, todo).subscribe(
    (res) => {
    },
    (error) => {
      console.log('error occured while setting todo status to important');
    }
  );
  return true;
}

/*getmyImportant() {
  return this.myImportant;
}*/

}
