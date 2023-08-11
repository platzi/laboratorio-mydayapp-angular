import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];
  taskForm!: FormGroup;
  isEditTask: boolean = false;
  taskToEdit!: number;
  @ViewChild('editInput') editInput!: ElementRef;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      //console.log(this.taskForm.value);
    }
  }

  saveNewTask(event: any): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();
    // console.log('Event', event);
    // console.log('Value', inputValue);

    if (inputValue != '') {
      const idNumber: number = this.tasks.length > 0 ? parseInt(this.tasks[this.tasks.length - 1].id) + 1 : 1;
      const id: string = idNumber.toString();

      const task: Task = {
        id: id,
        title: inputValue,
        completed: false
      };

      this.tasks.push(task);
      //console.log('Task', task);

      this.clearInput(this.taskForm.get('task'));
    } else {
      alert('The task is empty, type your task, please');
    }
  }

  clearInput(abstractControl: AbstractControl | null): void {
    if (abstractControl != null) {
      abstractControl.setValue('');
    }
  }

  changeTaskState(event: any, task: Task): void {
    //console.log('event', event);
    //console.log('Task', task.completed);
    task.completed = !task.completed;
    //console.log('Change task state', task.completed);
  }

  changeToEdit(editInputIndex: number): void {
    this.isEditTask = true;
    this.taskToEdit = editInputIndex;

    setTimeout(() => {
      if (this.editInput) {
        console.log('this.editInput', this.editInput);
        this.editInput.nativeElement.focus();
      }
    });
  }

  saveEdit(event: any, editInputIndex: number): void {
    const inputValue = (event.target as HTMLInputElement).value.trim();

    if (inputValue != '') {
      this.tasks[editInputIndex].title = inputValue;
      this.isEditTask = false;
    } else {
      alert('The task is empty, type your task, please');
    }

  }

  cancelEdit(): void {
    this.isEditTask = false;
  }

  getPendingTasks(): Task[] {
    const pendingTasks: Task[] = [];
    this.tasks.forEach((task: Task) => {
      if(!task.completed) {
        pendingTasks.push(task);
      }
    });
    return pendingTasks;
  }

}
