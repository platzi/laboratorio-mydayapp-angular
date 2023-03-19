import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TODO } from 'src/app/models/todo.model';
import { TodoComponent } from '../todo/todo.component';

import { TodoListComponent } from './todo-list.component';


describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todos = [
      new TODO('buy food', false)
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render 1 todo', ()=> {
    const todos = fixture.debugElement.queryAll(By.css('app-todo'));
    expect(todos.length).toBe(component.todos.length);
  });
});
