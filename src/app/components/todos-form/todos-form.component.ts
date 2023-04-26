import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoTask } from 'src/app/models/todo-task';
import { TodoTaskService } from 'src/app/services/todo-task.service';

@Component({
  selector: 'app-todos-form',
  templateUrl: './todos-form.component.html',
})
export class TodosFormComponent {
  public todosFormGroup: FormGroup = new FormGroup({
    label: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  public sub$: Subscription | undefined;
  public taskToAdd: TodoTask = { id: '', label: '', description: '' };
  public isLoading: boolean = false;

  constructor(private todoTaskService: TodoTaskService) {}

  submitForm() {
    this.isLoading = true;

    if (this.todosFormGroup.valid) {
      this.sub$ = this.todoTaskService
        .addOne(this.taskToAdd)
        .subscribe((data) => {
          this.isLoading = false;
          this.todosFormGroup.reset();
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
