import { Component, Input } from "@angular/core";
import { TodoTask } from "./models/todo-task";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public recivedTodoTask: TodoTask | undefined;
  constructor() {}
  reciveEditDetails(detailTaskToEdit: TodoTask) {
    this.recivedTodoTask = detailTaskToEdit;
    console.log(this.recivedTodoTask);
  }
}
