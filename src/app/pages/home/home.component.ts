import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask, ITaskInterface } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild('inputEdit') inputEdit!: ElementRef<HTMLInputElement>;

  isHiddenClearButton = true;
  completeTasksList: ITaskInterface[] = [];
  filterTasksList: ITaskInterface[] = [];
  newTask: ITaskInterface = {
    id: '0',
    title: '',
    completed: false,
    editMode: false,
  };

  filter = this.route.routeConfig?.path;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.completeTasksList = this.taskService.getTasks();
    this.filtTasks();
    this.changeHiddenStatus();
    this.newTask.id = this.completeTasksList.length.toString();
  }

  changeHiddenStatus() {
    for (let index = 0; index < this.completeTasksList.length; index++) {
      const task = this.completeTasksList[index];
      if (task.completed == true) {
        this.isHiddenClearButton = false;
        break;
      }
      this.isHiddenClearButton = true;
    }
  }

  filtTasks() {
    switch (this.route.routeConfig?.path) {
      case 'all':
        this.filterTasksList = this.completeTasksList;
        break;

        case '':
          this.filterTasksList = this.completeTasksList;
          break;
  

      case 'pending':
        this.filterTasksList = this.completeTasksList.filter(
          (task: ITaskInterface) => {
            return task.completed == false;
          }
        );
        break;
      case 'completed':
        this.filterTasksList = this.completeTasksList.filter(
          (task: ITaskInterface) => {
            return task.completed == true;
          }
        );
        break;
      default:
        break;
    }
  }

  addTask(event: KeyboardEvent) {
    if (event.key == 'Enter' && this.newTask.title.trim() !== '') {
      this.newTask.title = this.newTask.title.trim();
      //? Se utiliza el factor de propagacion para crear un  nuevo objeto, ya que si no se realiza esta accion ocasionara un problema de copia
      //? en todos los elementos del arreglo, ya que el valor se esta pasando por referencia, es decir que todos los valores del arreglo apuntan
      //? a mismo espacio en memoria, y si este espacio en memoria modifica su valor, todos los valores seran modificados.
      this.completeTasksList.push({
        ...this.newTask,
      });
      this.taskService.saveTasks(this.completeTasksList);
      this.newTask.id = this.completeTasksList.length.toString();
      this.newTask.title = '';
    }
  }

  changeStatus(task: ITaskInterface) {
    task.completed = !task.completed;
    this.taskService.saveTasks(this.completeTasksList);
    this.filtTasks();
    this.changeHiddenStatus();
  }

  activeEditMode(task: ITaskInterface) {
    task.editMode = true;
    setTimeout(() => {
      this.inputEdit.nativeElement.focus();
    }, 0);
  }

  updateTask(event: KeyboardEvent, task: ITaskInterface) {
    if (event.key == 'Escape') {
      task.editMode = false;
    }
    if (event.key == 'Enter' && task.title.trim() !== '') {
      task.title = task.title.trim();
      this.taskService.saveTasks(this.completeTasksList);
      task.editMode = false;
    }
  }

  deleteTask(task: ITaskInterface) {
    this.completeTasksList = this.completeTasksList.filter(
      (taskA: ITaskInterface) => {
        return taskA.id != task.id;
      }
    );

    this.taskService.saveTasks(this.completeTasksList);
    this.filtTasks();
    this.newTask.id = this.completeTasksList.length.toString();
  }

  clearCompleted() {
    this.completeTasksList = this.completeTasksList.filter(
      (task: ITaskInterface) => {
        return task.completed == false;
      }
    );

    this.taskService.saveTasks(this.completeTasksList);
    this.filtTasks();
    this.isHiddenClearButton = true;
  }
}
