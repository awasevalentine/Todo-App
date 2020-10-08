import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../Interfaces/todos.interface';
import { UserDetails } from '../Interfaces/userDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  //private apiUrl = 'https://barrondy-todo-app.herokuapp.com/todo/api';
  private apiUrl = 'http://localhost:3300/todo/api';
  //private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private myImportant: TodoItem[] = [];


  constructor(private http: HttpClient) {
   }

getTodo(){
  return this.http.get<any>(`${this.apiUrl}/getTodos`/*,{ headers: this.headers}*/);
}
getUserDetails(){
  return this.http.get<UserDetails>(`${this.apiUrl}/getUser`/*,{ headers: this.headers}*/);
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
createUser(userDetails: UserDetails){
  return this.http.post<UserDetails[]>(`${this.apiUrl}/createUser`, userDetails/*, {headers: this.headers}*/);
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
