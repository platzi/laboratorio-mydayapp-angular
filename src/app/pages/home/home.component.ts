import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  inputValue = '';
  tasks!: Task[];
  tasksLength!: number;

  constructor(
    private tasksService: TasksService
  ) { }

  createNewTask(){
    if(this.inputValue.length > 0){
      this.tasksService.createTask(this.inputValue);
      this.inputValue = '';
    }
  }

  ngOnInit(): void {
    this.tasksService.storage$
    .pipe(tap(tasksArr =>{
      this.tasksLength = 0;
      tasksArr.forEach(task =>{
        if(!task.completed){
          this.tasksLength++;
        }
      });
    }))
    .subscribe(tasksArr => this.tasks = tasksArr);
  }

  onCompleteTask(event: Event){
    const { target } = event;
    const { checked, value } = target as HTMLInputElement;
    this.tasksService.completeTask(value, checked);
  }

  onEditTask(e: MouseEvent){
    const { target } = e;
    const element = target as HTMLLabelElement;
    const li = element.parentNode?.parentNode as HTMLLIElement;
    li.className = '';
    li.classList.add('editing');
    //const { target } = e;
    //const li: HTMLLIElement = target?.parentNode.parentNode;

  }

  todoCount(): string{
    if(this.tasksLength == 1){
      return 'item';
    }
    return 'items';
  }
}
