import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TodosFormComponent } from './components/todos-form/todos-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    TaskItemComponent,
    TodosFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
