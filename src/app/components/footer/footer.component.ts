import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryFilter } from '../../models/category-filter.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  @Output() clearCompletedEvent = new EventEmitter<boolean>();

  @Input() filterSelected: CategoryFilter = 'all';

  @Input() set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.buildItemsInformation();
  }

  public tasks: Task[] = [];

  public tasksLeft = 0;
  public tasksDone = 0;

  constructor(
    private router: Router,
  ) { }

  buildItemsInformation(): void {
    this.tasksLeft = 0;
    this.tasksDone = 0;
    this.tasks.forEach((i: Task) => {
      if (i.completed) this.tasksDone++;
      else this.tasksLeft++;
    });
  }

  changeFilter(filter: CategoryFilter): void {
    this.filterSelected = filter;
    this.router.navigate([`/${filter}`]);
    this.buildItemsInformation();
  }

  clearItemsCompleted(): void {
    this.clearCompletedEvent.emit(true);
  }

}
