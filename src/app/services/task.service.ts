import { Injectable } from '@angular/core';
import { ITask, ITaskInterface } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): ITaskInterface[] {
    var arrayTask = localStorage.getItem('mydayapp-angular');

    if (arrayTask !== null) {
      var tasks = JSON.parse(arrayTask);
      tasks = tasks.map((task: ITask) => {
        return {
          ...task,
          editMode: false,
        };
      });

      return tasks;
    }

    return [];
  }

  saveTasks(tasks: ITaskInterface[]): void {
    localStorage.removeItem('mydayapp-angular');
    localStorage.setItem(
      'mydayapp-angular',
      JSON.stringify(
        tasks.map((task: ITaskInterface) => {
          return {
            id: task.id,
            title: task.title,
            completed: task.completed,
          };
        })
      )
    );
  }
}
