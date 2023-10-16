import { Component, OnInit } from '@angular/core';
import { filter, take, tap } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { Router, NavigationEnd } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  inputValue = '';
  tasks!: Task[];
  completedTasks!: number;
  currentUrl: string;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {
    this.currentUrl = this.router.url;
    this.tasksService.filterTasks(this.currentUrl);
  }

  createNewTask(){
    if(this.inputValue.length > 0){
      this.tasksService.createTask(this.inputValue.trim());
      this.inputValue = '';
    }
  }

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
    )
    .subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.tasksService.filterTasks(event.url);
      }
    });

    this.tasksService.storage$
    .pipe(tap(tasksArr =>{
      this.completedTasks = 0;
      tasksArr.forEach(task =>{
        if(task.completed){
          this.completedTasks++;
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
    const target = e.target as HTMLLabelElement;
    const li = target.parentNode?.parentNode as HTMLLIElement;
    const input = li.querySelector('.edit') as HTMLInputElement;
    li.className = '';
    li.classList.add('editing');
    input.focus();
  }

  onEditFinished(e: Event){
    const target = e.target as HTMLInputElement;
    const parent = target.parentNode as HTMLLIElement;
    const id = target.getAttribute('data-task-id');
    if(id){
      this.tasksService.editTask(id, target.value.trim());
    }
    parent.className = '';
    parent.classList.add('view');
  }

  onDeleteTask(id: Task['id']){
    if(typeof id == 'number'){
      this.tasksService.deleteTask(id);
    }

  }

  closeEditMode(e: Event){
    const target = e.target as HTMLInputElement;
    const parent = target.parentNode as HTMLLIElement;
    const isCompleted = parent.getAttribute('data-checked')
    parent.className = '';
    isCompleted === 'true' ? parent.classList.add('completed') : parent.classList.add('view');
  }

  onDeleteCompletedTasks(){
    this.tasksService.deleteCompletedTasks();
  }

  todoCount(): string{
    if(this.tasks.length == 1){
      return 'item';
    }
    return 'items';
  }
}
