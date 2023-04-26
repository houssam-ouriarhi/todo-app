import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoTask } from '../models/todo-task';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {

  private url: string = 'http://localhost:4300/Todo';

  constructor(private httpClient: HttpClient) { }

  addOne(task: TodoTask): Observable<TodoTask> {
    return this.httpClient.post<TodoTask>(`${this.url}/addOne`, task);
  }

  getAll(): Observable<TodoTask[]> {
    return this.httpClient.get<TodoTask[]>(`${this.url}/getAll`);
  }

  delete(id: string): Observable<TodoTask> {
    return this.httpClient.delete<TodoTask>(`${this.url}/deleteOne/${id}`);
  }

  // Update 
  update(id: string, task:TodoTask): Observable<TodoTask> {
    return this.httpClient.put<TodoTask>(`${this.url}/updateOne/${id}`,task);
  }
}
