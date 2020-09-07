import { Component, OnInit } from '@angular/core';
import { TodosDataService } from 'src/app/cores/services/todos-data.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayoutComponent implements OnInit {
  menuItems: any[];
  events: String[] = [];
  opened: boolean;

  importantTaskCount: number;
  constructor(private _todoService: TodosDataService) { }

  ngOnInit() {
   setInterval(
      ()=> {
        this.mylogic();
      }, 1000);
  }

  mylogic() {
    this._todoService.getImportantTodos().then(
      (importantTodos) => {
        this.importantTaskCount = importantTodos.length;
      }
    );
    // this.importantTaskCount = this._todoService.getmyImportant().length;
  }
}
