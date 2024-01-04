import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TareasStorageService } from 'src/app/services/tareas-storage.service';
import { Task, tasksStatusEnum } from 'src/app/types/tasks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public tasks: Task[] = Array.from<Task>({ length: 0 });
  public taskTitle: string = '';
  public countPendingTask: number = 0;
  public countCompleteTasks: number = 0;
  public countAllTasks: number = 0;

  private subs: Subscription = new Subscription();
  private param$ = this.route.paramMap;

  constructor(
    private tareasStorage: TareasStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.add(this.param$.subscribe(this.getParams));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getParams = (params: ParamMap) => {
    this.filterTasks(params);
  };

  private filterTasks(params: ParamMap) {
    if (params.has('estado')) {
      const estado: tasksStatusEnum = params.get('estado') as tasksStatusEnum;
      console.log(estado);
      if (estado === tasksStatusEnum.PENDING) {
        this.tasks = this.tareasStorage.getPendingTasks();
      } else {
        this.tasks = this.tareasStorage.getCompletedTasks();
      }
    } else {
      this.tasks = this.tareasStorage.gettasksList();
    }
    this.countPendingTask = this.tareasStorage.countPendingTasks;
    this.countCompleteTasks = this.tareasStorage.countCompletedTasks;
    this.countAllTasks = this.tareasStorage.countTasks;
  }

  public addTask() {
    const task: Task = {
      id: `${this.tareasStorage.biggerID + 1}`,
      title: this.taskTitle.trim(),
      completed: false,
    };

    if (this.tareasStorage.addTarea(task)) {
      const params: ParamMap = this.route.snapshot.paramMap;
      this.filterTasks(params);
    }

    this.taskTitle = '';
  }

  public onRefresh(event: boolean) {
    if (event) {
      const params: ParamMap = this.route.snapshot.paramMap;
      this.filterTasks(params);
    }
  }
}
