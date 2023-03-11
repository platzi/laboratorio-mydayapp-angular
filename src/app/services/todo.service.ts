import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '@app/models/Todo.model'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoListSource = new BehaviorSubject<ITodo[]>([]);

  constructor () {
    const storedList = localStorage.getItem(this.key);
    if (storedList && storedList.length > 0) {
      this.todoList$.subscribe(v=>this.currentList=v)
      this.todoListSource.next(JSON.parse(storedList));
    }
  }

  key = "mydayapp-angular"
  currentList!:ITodo[];
  todoList$ = this.todoListSource.asObservable()

  create(title: string) {
    const todo: ITodo = {
      id:this.currentList.length,
      title,
      completed: false
    };
    this.currentList.push(todo);
    this.todoListSource.next(this.currentList);
    localStorage.setItem(this.key, JSON.stringify(this.currentList))
  }

  update(id: number, todo: ITodo) {
    this.currentList.map(item=>{
      if(item.id==id){
        item=todo
      }
    })
    this.todoListSource.next(this.currentList);
    localStorage.setItem(this.key, JSON.stringify(this.currentList))
  }

  delete(id: number) {
    this.currentList=this.currentList.filter((item)=>item.id!==id)
    this.todoListSource.next(this.currentList);
    localStorage.setItem(this.key, JSON.stringify(this.currentList))
  }
  clearCompleted(){
    this.currentList=this.currentList.filter((item)=>item.completed===false)
    this.todoListSource.next(this.currentList);
    localStorage.setItem(this.key, JSON.stringify(this.currentList))
  }

}
