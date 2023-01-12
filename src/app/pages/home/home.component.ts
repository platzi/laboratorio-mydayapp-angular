import { Component, OnInit } from '@angular/core';
import { ITask, ITaskInterface } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: ITaskInterface[] = [];
  newTask: ITaskInterface = {
    id: '0',
    title: '',
    completed: false,
    editMode: false,
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.newTask.id = this.tasks.length.toString();
  }

  addTask(event: KeyboardEvent) {
    if (event.key == 'Enter' && this.newTask.title.trim() !== '') {
      this.newTask.title = this.newTask.title.trim();
      //? Se utiliza el factor de propagacion para crear un  nuevo objeto, ya que si no se realiza esta accion ocasionara un problema de copia
      //? en todos los elementos del arreglo, ya que el valor se esta pasando por referencia, es decir que todos los valores del arreglo apuntan
      //? a mismo espacio en memoria, y si este espacio en memoria modifica su valor, todos los valores seran modificados.
      this.tasks.push({
        ...this.newTask,
      });
      this.taskService.saveTasks(this.tasks);
      this.newTask.id = this.tasks.length.toString();
      this.newTask.title = '';
    }
  }

  changeStatus(task: ITask) {
    task.completed = !task.completed;
    this.taskService.saveTasks(this.tasks);
  }

  activeEditMode(task: ITaskInterface) {
    task.editMode = true;
  }

  updateTask(event: KeyboardEvent, task: ITaskInterface) {
    if (event.key == 'Escape') {
      task.editMode = false;
    }
    if (event.key == 'Enter' && this.newTask.title.trim() !== '') {
      task.title = task.title.trim();
      this.taskService.saveTasks(this.tasks);
      task.editMode = false;
    }
  }

  deleteTask(task: ITaskInterface) {
    this.tasks = this.tasks.filter((taskA: ITaskInterface) => {
      return taskA.id != task.id;
    });

    this.taskService.saveTasks(this.tasks);
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task: ITaskInterface) => {
      return task.completed == false;
    });

    this.taskService.saveTasks(this.tasks);
  }
}
