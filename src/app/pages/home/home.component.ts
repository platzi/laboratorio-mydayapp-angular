import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    taskInput!: FormGroup
    listAlone: boolean = true

    constructor(private builder: FormBuilder, private task:TaskService) {
        this.taskInput = builder.group({
            task: ['',Validators.required]
        })
    }

    ngOnInit() {
        const local = window.localStorage.getItem('mydayapp-angular')
        if (local) {
            const localParced = JSON.parse(local)
            this.task.localTasks = localParced!
        }
        this.task.listAlone.subscribe({
            next: (element:boolean) => {
                this.listAlone = element
            }
        })
    }

    onSubmit(){
        const sendElement = this.taskInput.get('task')?.value
        if (sendElement) this.task.newTask = sendElement.trim()
    }

    onSend(e:KeyboardEvent){
        if (e.key === 'Enter'){
            this.onSubmit()
            this.taskInput.reset()
        }
    }

}
