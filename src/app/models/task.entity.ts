export class TaskEntity {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean
  ) {}

  makeTaskComplete() {
    this.completed = true;
  }

  makeTaskIncomplete() {
    this.completed = false;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}
