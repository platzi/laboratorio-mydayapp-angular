export interface ITaskInterface {
  id: string;
  title: string;
  completed: boolean;
  editMode: boolean;
}
export interface ITask extends Omit<ITaskInterface, 'editMode'> {}
