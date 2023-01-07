export interface Item {
  task: string;
  done: boolean;
}

export interface ItemEdited {
  index: number;
  task: string;
  done: boolean;
}
