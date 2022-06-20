import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../Interfaces/todos.interface';
import { UserDetails } from '../Interfaces/userDetails.interface';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  //private headers = new HttpHeaders().set('Content-Type', 'application/json');



  private myImportant: TodoItem[] = [];


  constructor(private http: HttpClient) { }



      public postTodo(todo: TodoItem) {
        return this.http.post<TodoItem[]>(`${environment.todosUrl}/createTodo`, todo/*, {headers: this.headers}*/);
      }



      // Method for getting user todos
      public getTodo(){
      return this.http.get<any>(`${environment.todosUrl}/getTodos`/*,{ headers: this.headers}*/);
      }

      // Method for getting user todos by userid
      public getTodosByUserId(userId: any): Observable<TodoItem[]>{
      return this.http.get<any>(`${environment.todosUrl}/userId/${userId}`/*,{ headers: this.headers}*/);
      }


  public myImportantTodo(userId: any): Observable<TodoItem[]> {
    const myWebSocket: WebSocketSubject<any> = webSocket(`ws://barrondy-todo-app.herokuapp.com/todo/api/userId/${userId}`);
    return myWebSocket.asObservable();
  }
      // Method for getting todo by id
      public getTodoById(id: any) {
        return this.http.get<any>(`${environment.todosUrl}/getTodo/${id}`/*,{ headers: this.headers}*/);
      }


      // Method for deleting  user todo
      public deleteTodo(id: string) {
      return this.http.delete<TodoItem[]>(`${environment.todosUrl}/deleteTodo/${id}`/*, { headers: this.headers}*/);
      }


      // Method for updating user todo
      public updateTodo(id, todo: TodoItem) {
        return this.http.put<TodoItem[]>(`${environment.todosUrl}/updateTodo/${id}`, todo/*, {headers: this.headers}*/);

      }



      // Method for setting  user important todos
      setImportantTodo(todo: TodoItem) {
      this.updateTodo(todo._id, todo).subscribe(
        (res) => {
        },
        (error) => {
          console.log('error occured while setting todo status to important');
        }
      );

    }


      // Method for getting user important todos
        getImportantTodos(userId: any): Promise<TodoItem[]> {
        return new Promise<TodoItem[]>((resolve, reject) => {
          this.getTodosByUserId(userId).subscribe(
          (todos) => {

            const importantTodos = todos.filter(td => td.important);
            resolve(importantTodos);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }


        // Method for removing user important todos
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

    }
