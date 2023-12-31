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
  tasks = signal<task[]>([{
    id: "juanda",
    title: "Soy una tarea",
    completed: false
  }])

  addTask(title: string){
    this.tasks.update(prev => {
      return[
        ...prev,
        {
          id: Date.now().toString(),
          title: title,
          completed: false
        }]
    })
  }
}
