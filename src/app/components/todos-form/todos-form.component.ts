import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { TodoTask } from "src/app/models/todo-task";
import { TodoTaskService } from "src/app/services/todo-task.service";

@Component({
  selector: "app-todos-form",
  templateUrl: "./todos-form.component.html",
})
export class TodosFormComponent {
  @Input() taskToEdit: TodoTask | undefined;

  public todosFormGroup: FormGroup = new FormGroup({
    label: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  public sub$: Subscription | undefined;
  public taskToAdd: TodoTask = { id: "", label: "", description: "" };
  public isLoading: boolean = false;

  constructor(private todoTaskService: TodoTaskService) {}
  ngOnChanges(change: TodoTask) {
    if ("taskToEdit" in change) {
      if (this.taskToEdit) {
        this.taskToAdd = this.taskToEdit;
      }
      console.log(this.taskToEdit);
    }
  }
  ngOnInit(): void {}
  submitForm() {
    this.isLoading = true;

    if (this.todosFormGroup.valid) {
      if (this.taskToEdit) {
        // edite task

        this.sub$ = this.todoTaskService
          .update(this.taskToEdit.id, this.taskToEdit)
          .subscribe((data) => {
            this.isLoading = false;
            this.todosFormGroup.reset();
          });
      } else {
        // add task
        this.sub$ = this.todoTaskService
          .addOne(this.taskToAdd)
          .subscribe((data) => {
            this.isLoading = false;
            this.todosFormGroup.reset();
          });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
