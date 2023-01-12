import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor() { }
    private _taskList: BehaviorSubject<any> = new BehaviorSubject([])
    private _flag = new BehaviorSubject(true)
    private _list = ['']

    get taskList () {
        return this._taskList.asObservable()
    }

    get listAlone () {
        return this._flag.asObservable()
    }

    set newTask (element: string) {
        if (this._list[0] === '') this._list = [element]
        else this._list.push(element)
        this._taskList.next(this._list)
        this._flag.next(false)
        window.localStorage.setItem('mydayapp-angular',JSON.stringify(this._list))
    }

    set localTasks (element: any) {
        this._list = element
        this._taskList.next(this._list)
        this._flag.next(false)
    }

}
