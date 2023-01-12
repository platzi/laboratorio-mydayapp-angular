import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

    taskList = []

    constructor(private task: TaskService) { }

    ngOnInit(): void {
        this.task.taskList.subscribe({
            next: list => {
                this.taskList = list
            }
        })
    }
}
