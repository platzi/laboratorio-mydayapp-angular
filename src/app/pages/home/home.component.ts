import { Component, OnInit, signal } from '@angular/core';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { TaskComponent } from 'src/app/components/task/task.component';
import { task } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TaskComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent{

  constructor() { }

  //Las tareas que se van a desplegar
  tasks = signal<task[]>([])

  //Añade una tarea a la lista
  addTask(title: string){
    this.tasks.update(prev => {
      return[
        ...prev,
        {
          id: Date.now().toString(),
          title: title,
          completed: false,
          editing: false,
        }]
    })
  }

  //Completa una tarea
  completeTask(task: task){
    this.tasks.update(prev => {
      return prev.map(t => {
        if(task.id === t.id){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return {
          ...t
        }
      })
    })
  }

  //Pone una tarea en modo edición
  editTask(task: task){
    this.tasks.update(prev => {
      return prev.map(t => {
        if(task.id === t.id){
          return {
            ...task,
            editing: !task.editing
          }
        }
        return {
          ...t,
          editing: false
        }
      })
    })
  }

  //Actualiza una tarea
  updateTask(event: [task, string]){
    const [t, title] = event

    if(title === "") return

    this.tasks.update(prev => {
      return prev.map((task) => {
        if (task.id == t.id){
          return {
            ...task,
            title: title.trim(),
            editing: false
          }
        }
        return task
      })
    })
  }

  deleteTask(task: task){
    this.tasks.update(prev => {
      return prev.filter(t => t.id != task.id)
    })
  }
}
