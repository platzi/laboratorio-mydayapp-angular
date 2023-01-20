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
    private _completed = new BehaviorSubject(false)
    private _list: [TaskInterface] | any = []

    get taskList() {
        return this._taskList.asObservable()
    }

    get listAlone() {
        return this._flag.asObservable()
    }

    get listCompleted() {
        return this._completed.asObservable()
    }

    set newTask(element: string) {
        if (!this._list[0]) {
            this._list = [{
                id: 0,
                title: element,
                completed: false
            }]
            this._flag.next(false)
        }
        else {
            const uuid = this._list[this._list.length - 1].id
            this._list.push({
                id: uuid + 1,
                title: element,
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
        this._completed.next(this._list.some((element: TaskInterface) => element.completed === true))
    }

    set updateState(element: number) {
        this._list = this._list.map((_listElement: TaskInterface) => {
            if (_listElement.id === element) {
                _listElement.completed = !_listElement.completed
                return _listElement
            }
            return _listElement
        })
        this._taskList.next(this._list)
        this._completed.next(this._list.some((element: TaskInterface) => element.completed === true))
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }

    setUpdateValue(element: number, title: string) {
        this._list = this._list.map((_listElement: TaskInterface) => {
            if (_listElement.id === element) {
                _listElement.title = title
                return _listElement
            }
            return _listElement
        })
        this._taskList.next(this._list)
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }

    clearValues() {
        let _cleanList:[]|any = []
        this._list.forEach((element:TaskInterface) => {
            if (element.completed === false) {
                _cleanList.push(element)
            }
        })
        this._list = _cleanList
        this._taskList.next(this._list)
        this._completed.next(false)
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }

    set deleteValue(id:number) {
        let _cleanList:[]|any = []
        this._list.forEach((element:TaskInterface) => {
            if (element.id !== id) {
                _cleanList.push(element)
            }
        })
        this._list = _cleanList
        this._taskList.next(this._list)
        window.localStorage.setItem('mydayapp-angular', JSON.stringify(this._list))
    }
}
