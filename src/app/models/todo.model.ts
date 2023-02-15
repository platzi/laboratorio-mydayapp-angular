export class Todo {
  public id: string;
  public title: string;
  public completed: boolean;

  constructor(title: string) {
    this.id = (Math.random() + 1).toString(36).substring(3);
    this.title = title;
    this.completed = false;
  }
}
