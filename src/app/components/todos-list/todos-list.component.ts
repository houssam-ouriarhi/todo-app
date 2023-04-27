import { Component, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { TodoTask } from "src/app/models/todo-task";
import { TodoTaskService } from "src/app/services/todo-task.service";

@Component({
  selector: "app-todos-list",
  templateUrl: "./todos-list.component.html",
})
export class TodosListComponent {
  @Output() editDetails: EventEmitter<TodoTask> = new EventEmitter();

  public sub$: Subscription | undefined;
  public tasks: TodoTask[] = [];
  public isLoading: boolean = true;

  // alert prop
  public alertShown: boolean = false;
  public alertMsg: string = "";
  public alertColor: string = "";

  constructor(private todoTaskService: TodoTaskService) {}

  ngOnInit(): void {
    this.sub$ = this.todoTaskService.getAll().subscribe((data) => {
      this.tasks = data;
      this.isLoading = false;
    });
  }

  editClicked(emited: TodoTask) {
    this.editDetails.emit(emited);
  }

  deleteClicked(emited: TodoTask) {
    this.isLoading = true;
    this.sub$ = this.todoTaskService.delete(emited.id).subscribe((data) => {
      this.notify("Task deleted successfully!", "danger");
      this.ngOnInit();
    });
  }

  notify(msg: string, color: string) {
    this.alertMsg = msg;
    this.alertColor = color;
    this.alertShown = true;
  }

  hideAlert() {
    this.alertShown = false;
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
