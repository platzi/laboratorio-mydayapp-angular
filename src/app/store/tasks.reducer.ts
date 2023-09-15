import { ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import {
  add,
  clearCompleted,
  remove,
  toggle,
  changeTitle,
  changeFilter,
} from './tasks.actions';
import { Filter, Task } from '../models';
import { map, merge } from 'rxjs';

export interface TasksState {
  tasks: Task[];
  filter: Filter;
}
export const TasksKey = 'tasksStore';

export const initialState: TasksState = {
  tasks: [],
  filter: 'all',
};

export const tasksReducer = createReducer(
  initialState,
  on(add, (state, payload) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id: Date.now().toString(),
        completed: false,
        title: payload.title,
      },
    ],
  })),
  on(remove, (state, payload) => ({
    ...state,
    tasks: [...state.tasks.filter((t) => t.id !== payload.id)],
  })),
  on(clearCompleted, (state) => ({
    ...state,
    tasks: [...state.tasks.filter((t) => !t.completed)],
  })),
  on(toggle, (state, payload) => ({
    ...state,
    tasks: [
      ...state.tasks.map((t) => {
        if (t.id === payload.id) {
          const updatedTask = { ...t };
          updatedTask.completed = !t.completed;
          return updatedTask;
        }
        return t;
      }),
    ],
  })),
  on(changeTitle, (state, payload) => ({
    ...state,
    tasks: [
      ...state.tasks.map((t) => {
        if (t.id === payload.id) {
          const updatedTask = { ...t };
          updatedTask.title = payload.title;
          return updatedTask;
        }
        return t;
      }),
    ],
  })),
  on(
    changeFilter,
    (state, payload): TasksState => ({
      ...state,
      filter: payload.filter,
    })
  )
);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  let onInit = true;
  return function (state, action) {
    // reduce the nextState.
    const nextState = reducer(state, action);

    if (onInit) {
      onInit = false;
      const localStorageString = localStorage.getItem('mydayapp-angular');

      const savedTasks = localStorageString
        ? JSON.parse(localStorageString)
        : [];

      const copy = { ...nextState };
      copy.tasksStore.tasks = savedTasks;

      return copy;
    }

    localStorage.setItem(
      'mydayapp-angular',
      JSON.stringify(nextState.tasksStore.tasks)
    );

    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
