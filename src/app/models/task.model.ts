export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface ViewConfig {
  all: boolean,
  completed: boolean,
  uncompleted: boolean
}