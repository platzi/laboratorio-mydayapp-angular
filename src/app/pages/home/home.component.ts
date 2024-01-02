import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/taks.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];
  filteredtask: Task[] = [];
  status = ''

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const storageTask = localStorage.getItem('mydayapp-angular') 
    if(!storageTask) return
    this.tasks = JSON.parse(storageTask)

    this.route.params.subscribe(({status}) => {
    this.status = status;
     if(status){
      this.filteredtask = this.filterTask()
     } else {
      this.filteredtask = this.tasks
     }
    })
  }

  filterTask(){
    return this.tasks.filter(task => {
      return this.status === 'completed' ? task.completed : !task.completed
    })
  }

  onAddTask(event: Event){
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if(value.length === 0) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: value,
      completed: false,
      isEditing: false
    }
    this.tasks.push(newTask);
    this.filteredtask = this.filterTask()
    input.value = ''
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks))
  }

  completeTask(index: number){
    this.tasks[index].completed = !this.tasks[index].completed
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks))
  }

  onEditMode(id: string, event: Event){
    this.tasks = this.tasks.map(task => {
      return task.id === id ? {...task, isEditing: true } : task
    })
    this.filteredtask = this.filterTask()
  }

  editTask(id: string, event: Event){
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if(value.length === 0) return;
    this.tasks = this.tasks.map(task => {
      return task.id === id 
        ? {...task, title: value, isEditing: false } 
        : task
    })
    this.filteredtask = this.filterTask()
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks))
  }

  deleteTask(id: string){
    this.tasks = this.tasks.filter( task => task.id != id)
    this.filteredtask = this.filterTask()
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks))
  }

  escapeEditMode(i: number, event: Event){
    this.tasks[i].isEditing = false
    const input = event.target as HTMLInputElement;
    input.value = this.tasks[i].title
  }

  clearCompleted(){
    this.tasks = this.tasks.filter((task) => task.completed !== true)
    this.filteredtask = this.filterTask()
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks))
  }

  completedButtons(){
    return this.tasks.filter(task => task.completed).length
  }

}
