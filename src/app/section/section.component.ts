import { Component } from '@angular/core';
import { TasksService } from '../shared/services/tasks/tasks.service';
import { Task } from '../shared/models/task';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  tasksList: Array<Task>;
  subscription: Subscription;
  
  constructor(private tasksService: TasksService, private route: ActivatedRoute) {
    this.subscription = Subscription.EMPTY;
    this.tasksList = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const param = this.route.snapshot.paramMap.get('status');
      if(param) {
        if(param === 'pending') {
          this.tasksService.filterTasks(false);
        } else if(param === 'completed') {
          this.tasksService.filterTasks(true);
        }
      } else {
        this.tasksService.filterTasks();
      }
    });
    
    this.subscription = this.tasksService.tasks$.subscribe( tasks => {
      this.tasksList = tasks;
    });
  }

  completedTask(task: Task) {
    task.completed = !task.completed;
    this.tasksService.editTask(task);
  }

  editingTask(task: Task) {
    let element = document.getElementById(task.id);
    element?.classList.add('editing');
    window.setTimeout(function() {
      let input = document.getElementById(`input${task.id}`);
      input?.focus();
      input?.setAttribute('value',task.title);
      element?.focus();
    }, 0);
  }

  updateTask(event:any, task: Task) {
    let taskTitle = event.target.value.trim();
    if(taskTitle.length > 0 ) {
      task.title = taskTitle;
      this.tasksService.editTask(task);
      let element = document.getElementById(task.id);
      element?.classList.remove('editing');
    }
  }

  cancelTask(task: Task) {
    let element = document.getElementById(task.id);
    element?.classList.remove('editing');
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task);
  }

}
