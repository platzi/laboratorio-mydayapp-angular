import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  injector = inject(Injector)

  constructor(private route: ActivatedRoute) {}

  //Las tareas que se van a desplegar
  tasks = signal<task[]>([])

  //Completed tasks
  completed = computed(() => {
    return this.tasks().reduce((prev, task) => {
      const count = task.completed?1:0
      return prev + count
    }, 0)
  })

  filtered = signal<task[]>([])
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
    this.subscribeRoute()
  }

  ngOnInit(){
    const storage = localStorage.getItem('mydayapp-angular')
    if(storage){
      const tasks = JSON.parse(storage) as Array<task>
      this.tasks.set(tasks)
    }

    this.trackTasks()
    this.subscribeRoute()
  }

  subscribeRoute(){
    this.route.url.subscribe(url => {
      if(url.length === 0){
        this.filtered.set(this.tasks())
        console.log('entro')
        return
      }
      const {path} = url[0]
      switch (path){
        case 'all':
          this.filtered.set(this.tasks())
          break
        case 'pending':
          this.filtered.set(this.tasks().filter(task => !task.completed))
          break
        case 'completed':
          this.filtered.set(this.tasks().filter(task => task.completed))
          break
      }
    });
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks()
      localStorage.setItem('mydayapp-angular', JSON.stringify(tasks))
    }, {injector: this.injector})
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
    this.subscribeRoute()
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
    this.subscribeRoute()
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
    this.subscribeRoute()
  }

  //Elimina una tarea
  deleteTask(task: task){
    this.tasks.update(prev => {
      return prev.filter(t => t.id != task.id)
    })
    this.subscribeRoute()
  }

  //Elimina todas las tareas que ya fueron completadas
  deleteCompleteTasks(){
    this.tasks.update(prev => prev.filter(task => !task.completed))
    this.subscribeRoute()
  }
}
