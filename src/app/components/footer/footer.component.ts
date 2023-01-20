import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

    taskList = []
    check = false

    constructor(private task: TaskService) { }

    ngOnInit(): void {
        this.task.taskList.subscribe({
            next: list => {
                this.taskList = list
            }
        })
        this.task.listCompleted.subscribe({
            next: element => {
                this.check = element
            }
        })
    }
    ngClear(){
        this.task.clearValues()
    }
}
