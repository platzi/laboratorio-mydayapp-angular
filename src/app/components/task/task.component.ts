import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit{

  inputTask : FormControl = new FormControl(null);
  editing: boolean = false;

  @Input() task !: Task;

  @ViewChild('editInput') editInput !: ElementRef<HTMLInputElement>;

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(this.editing){
      this.editing = false;
    }
  }

  constructor(
    private tasksServices: TasksService,
    private cdRef: ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    if(this.task){
      this.inputTask.setValue(this.task.title)
    }
  }


  deleteTask(task:Task){
    this.tasksServices.deleteTask(task);
  }

  saveTask(event:KeyboardEvent){
    if(event.key == 'Enter'){
      let title: string = this.inputTask.value;
      if(title && title.trim() != ''){
        let newTask: Task = {
          id: this.task.id,
          completed: this.task.completed,
          title: title.trim()
        }
        this.tasksServices.updateTask(newTask);
      }
      this.editing = false;
    }
  }

  editTask(){
    this.editing = !this.editing;
    this.cdRef.detectChanges();
    this.editInput.nativeElement.focus();
  }

  toggle(){
    this.tasksServices.toggle(this.task.id)
  }
}
