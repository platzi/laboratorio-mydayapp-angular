export class TODO {

  private _id: number;
  private _completed: boolean;
  private _title: string;
  private _editing: boolean;

  constructor(title: string, completed: boolean = false) {
    this._id = new Date().getTime() * Math.random();
    this._title = title;
    this._editing = false;
    this._completed = completed;
  }

  get id () {
    return this._id;
  }

  get isEditing() {
    return this._editing;
  }

  set isEditing(value: boolean) {
    this._editing = value;
  }

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value.trim();
  }

  get completed() {
    return this._completed;
  }

  set completed(value: boolean) {
    this._completed = value;
  }

  getValues() {
    return {
      id: this._id,
      title: this._title,
      completed: this._completed
    }
  }
}
