import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '@app/models/Todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoListSource = new BehaviorSubject<ITodo[]>([]);
  key = "mydayapp-angular"
  currentList!:ITodo[];
  todoList$ = this.todoListSource.asObservable()

  constructor () {
    const storedList = localStorage.getItem(this.key);
    if (storedList && storedList.length > 0) {
      this.todoListSource.next(JSON.parse(storedList));
    }
    this.todoList$.subscribe(v=>this.currentList=v);
  }

  saveStorage(currentList:ITodo[]){
    localStorage.setItem(this.key, JSON.stringify(currentList));
  }

  create(title: string) {
    const todo: ITodo = {
      id:this.currentList.length,
      title,
      completed: false
    };
    if(title){
      this.currentList.push(todo);
      this.todoListSource.next(this.currentList);
      this.saveStorage(this.currentList);
    }
  }

  update(id: number, todo: ITodo) {
    this.currentList.map(item=>{
      if(item.id==id){
        item=todo
      }
    })
    this.todoListSource.next(this.currentList);
    this.saveStorage(this.currentList);
  }

  delete(id: number) {
    this.currentList=this.currentList.filter((item)=>item.id!==id);
    this.todoListSource.next(this.currentList);
    this.saveStorage(this.currentList);
  }

  clearCompleted(){
    this.currentList=this.currentList.filter((item)=>item.completed===false);
    this.todoListSource.next(this.currentList);
    this.saveStorage(this.currentList);
  }

}
