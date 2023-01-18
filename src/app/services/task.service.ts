import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskInterface } from '../interfaces/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor() { }
    private _taskList: BehaviorSubject<any> = new BehaviorSubject([])
    private _flag = new BehaviorSubject(true)
    private _list: [TaskInterface] | any = []

    get taskList() {
        return this._taskList.asObservable()
    }

    get listAlone() {
        return this._flag.asObservable()
    }

    set newTask(element: string) {
        if (!this._list[0]) {
            this._list = [{
                id: 0,
                label: element,
                completed: false
            }]
            this._flag.next(false)
        }
        else {
            const uuid = this._list[this._list.length - 1].id
            this._list.push({
                id: uuid + 1,
                label: element,
                completed: false
            })
        }
        this._taskList.next(this._list)
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }

    set localTasks(element: [TaskInterface]) {
        this._list = element
        this._taskList.next(this._list)
        this._flag.next(false)
    }

    set updateState(element: number) {
        this._list = this._list.map((_listElement:TaskInterface) => {
            if(_listElement.id === element) {
                _listElement.completed = !_listElement.completed
                return _listElement
            }
            return _listElement
        })
        this._taskList.next(this._list)
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }

    setUpdateValue(element:number, label:string) {
        this._list = this._list.map((_listElement:TaskInterface) => {
            if(_listElement.id === element) {
                _listElement.label = label
                return _listElement
            }
            return _listElement
        })
        this._taskList.next(this._list)
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }
}
