import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskInterface } from 'src/app/interfaces/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, AfterViewInit{

    taskList!: [TaskInterface]

    constructor(private task: TaskService) { }


    ngOnInit(): void {
        this.task.taskList.subscribe({
            next: list => {
                this.taskList = list
            }
        })
    }

    ngAfterViewInit() {
        this.taskList.forEach(taskElement => {
            if (taskElement.completed) {
                const target:HTMLInputElement | any = document.getElementById(`${taskElement.id}`)
                target.checked = true
                target.parentElement?.parentElement?.classList.add('completed')
            }
        })
    }

    changeState(e:Event) {
        const target:HTMLInputElement | any = e.target
        if (target.checked) {
            target.checked = true
            target.parentElement?.parentElement?.classList.add('completed')
        }
        else {
            target.checked = false
            target.parentElement?.parentElement?.classList.remove('completed')
        }
        this.task.updateState = parseInt(target.dataset.id)
    }

    editState(e:Event) {
        const target:HTMLElement| any = e.target
        target.parentElement?.parentElement?.classList.add('editing')
    }

    editEvent(e:KeyboardEvent) {
        if (e.key === 'Enter'){
            const target:HTMLElement| any = e.target
            target.parentElement?.classList.remove('editing')
        }
    }

    editElement(e:KeyboardEvent|any, id:number){
        if (e.key === 'Enter'){
            this.task.setUpdateValue(id, e.target.value.trim())
        }
    }

    deleteElement(id:number){
        this.task.deleteValue = id
    }

    ups(){
        console.log('ups')
    }
}
