import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksStorageService } from '../../Services/tasks-storage.service';
import { CategoryFilter } from '../../models/category-filter.model';
import { Task, TaskEdited } from '../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public tasks: Task[] = [];
  public tasksBackup: Task[] = [];

  public filterSelected: CategoryFilter = 'all';

  constructor(
    private route: ActivatedRoute,
    private storage: TasksStorageService,
  ) { }

  ngOnInit(): void {
    this.tasksBackup = this.storage.get();
    this.route.params
      .subscribe(p => {
        this.filterSelected = p['filter'] || 'all';
        this.changeFilter();
      })
  }

  addTask(title: string): void {
    this.tasks = this.tasksBackup.concat({
      title: title.trim(),
      completed: false
    });
    this.setBackup();
  }

  editTask(task: TaskEdited): void {
    this.tasks = this.tasksBackup.map((i: Task, j: number) => {
      if (j == task.id) return { title: task.title, completed: task.completed }
      else return i;
    });
    this.setBackup();
  }

  toggleTask(index: number): void {
    this.tasks = this.tasksBackup.map((i: Task, j: number) => {
      if (j == index) return { title: i.title, completed: !i.completed }      // Change title status
      else return i;
    });
    this.setBackup();
  }

  destroyTask(index: number): void {
    this.tasks = this.tasksBackup.filter((i: Task, j: number) => {
      return j != index;
    });
    this.setBackup();
  }

  changeFilter(): void {
    if (this.filterSelected == 'pending')
      this.tasks = this.tasksBackup.filter((i: Task) => !i.completed );
    else if (this.filterSelected == 'completed')
      this.tasks = this.tasksBackup.filter((i: Task) => i.completed );
    else
      this.tasks = this.tasksBackup;
  }

  clearCompletedEvent(clear: boolean): void {
    this.tasksBackup = this.tasksBackup.filter((i: Task) => !i.completed );
    this.changeFilter();
    this.storage.update(this.tasksBackup);
  }

  setBackup(): void {
    this.tasksBackup = this.tasks;
    this.changeFilter();
    this.storage.update(this.tasksBackup);
  }

}


