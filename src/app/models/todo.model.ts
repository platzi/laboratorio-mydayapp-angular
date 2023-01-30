import { TODOStatus } from "../services/todo.service";

export class TODO {

  private _id: number;
  private _status: TODOStatus;
  private _description: string;
  private _editing: boolean;

  constructor(description: string, initialStatus: TODOStatus = TODOStatus.pending) {
    this._id = new Date().getTime();
    this._status = initialStatus;
    this._description = description;
    this._editing = false;
  }

  get id () {
    return this._id;
  }

  get isCompleted() {
    return this._status;
  }

  get status() {
    return this._status;
  }

  get isEditing() {
    return this._editing;
  }

  set isEditing(value: boolean) {
    this._editing = value;
  }

  get description() {
    return this._description;
  }

  set toogleStatus(value: TODOStatus) {
    this._status = value;
  }

  getValues() {
    return {
      id: this._id,
      description: this._description,
      status: this._status
    }
  }
}
