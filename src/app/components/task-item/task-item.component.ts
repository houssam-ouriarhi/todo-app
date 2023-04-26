import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoTask } from 'src/app/models/todo-task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: TodoTask | undefined;

  @Output() editClick: EventEmitter<TodoTask> = new EventEmitter();
  @Output() deleteClick: EventEmitter<TodoTask> = new EventEmitter();

  notifyEdit(task: TodoTask | undefined) {
    this.editClick.emit(task);
  }

  notifyDelete(task: TodoTask | undefined) {
    this.deleteClick.emit(task);
  }
}
