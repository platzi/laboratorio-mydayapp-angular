import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

export interface IHomeWork {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})



export class HomeComponent implements OnInit {



  toDoList: Array<IHomeWork> = [];
  isEmpty = false;
  titleField = new FormControl();
  titleFieldEdit = new FormControl();
  generateID: number = 0;
  item: string = 'items';
  class: string = '';
  isChecked: boolean = false;
  isEditMode: boolean = false;
  id: number = 0;
  checked: boolean = false;
  hasCompleted: boolean = false;
  element!: HTMLElement;
  indexToDoList: number = 0;

  filterPending: boolean = false;
  filterCompleted: boolean = false;
  filterAll: boolean = false;

  @Output() homeWorks = new EventEmitter<IHomeWork>();
  @Input() entrada: Array<IHomeWork> = []
  @Input() classFilter: string = '';


  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {
    switch (this.classFilter) {
      case 'pending':
        this.filterPending = true;
        break;
        case 'completed':
          this.filterCompleted = true;
          break;
          case '':
          this.filterAll = true;
          break;
    }

    console.log(this.classFilter);

    if (this.entrada.length > 0) {
      this.toDoList = this.entrada;
      this.hideFooterMain();
      this.checkCompleted();
      return;
    }


    this.toDoList = JSON.parse(localStorage.getItem('mydayapp-angular') || '[]')
    this.checkCompleted();
    this.hideFooterMain();
  }


  addHomeWork() {

    let title: string = this.titleField.value;

    if (!title) {
      return;
    }

    this.generateID += 1;

    const task: IHomeWork = {
      id: this.generateID,
      title: title.trim(),
      completed: false
    };

    this.toDoList.push(task);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.toDoList))
    this.addToLocalStorage();
    this.showFooterMain();


    this.titleField.setValue('');
    this.controlLabelItem();
  }

  controlLabelItem() {
    (this.toDoList.length === 1) ? this.item = 'item' : this.item = 'items';
  };

  destroyTask(id: number) {
    const indexTask = this.toDoList.findIndex(item => item.id === id);
    this.toDoList.splice(indexTask, 1);
    this.addToLocalStorage();
    this.hideFooterMain();
  }

  addToLocalStorage() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.toDoList))
  }

  hideFooterMain() {
    if (this.toDoList.length <= 0) {
      this.isEmpty = true;
    }
  }

  showFooterMain() {
    if (this.toDoList.length > 0) this.isEmpty = false;
  }

  checkboxChange($event: any, itemSelected: IHomeWork) {

    if ($event.target.checked) {
      itemSelected.completed = true;
      this.hasCompleted = true;
    } else {
      itemSelected.completed = false;
      this.hasCompleted = false;

    }
    this.addToLocalStorage();

  }

  updateTask(itemSelected: IHomeWork) {
    const indexTask = this.toDoList.findIndex(item => item.id === itemSelected.id);
    this.element = document.getElementById(String(indexTask)) as HTMLElement;
    this.element.className = 'editing';
    this.titleFieldEdit.setValue(itemSelected.title);
    this.indexToDoList = indexTask;
  }

  editTask() {
    let newTitle: string = this.titleFieldEdit.value;
    this.toDoList[this.indexToDoList].title = newTitle.trim();
    this.addToLocalStorage();
    this.element = document.getElementById(String(this.indexToDoList)) as HTMLElement;
    this.element.className = '';
  }

  changeClass(itemSelected: IHomeWork): string {
    let classType: string = '';

    const typeClass = {
      new: '',
      completed: 'completed',
      editing: 'editing'
    };

    if (itemSelected.completed) {
      classType = typeClass.completed
      this.checked = true;
    };

    if (this.isEditMode) {
      classType = typeClass.editing
    }

    return classType;
  }

  validateCompleted(itemSelected: IHomeWork): boolean {
    let isCompleted: boolean = false;

    (itemSelected.completed) ? isCompleted = true : isCompleted = false;

    return isCompleted;
  };

  clearCompleted() {
    this.toDoList = this.toDoList.filter(item => !item.completed);
    this.addToLocalStorage();
    this.checkCompleted();
  }

  filterSelected( filter: string) {
    this.element = document.getElementById(filter) as HTMLElement;
    this.element.className = 'selected';
    console.log(filter);
  }

  checkCompleted() {
    const hasComplete = this.toDoList.filter(item => item.completed)
    if (hasComplete.length <= 0) {
      this.hasCompleted = false;
    }
  }


}
