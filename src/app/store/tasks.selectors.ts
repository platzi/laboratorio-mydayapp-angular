import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksKey, TasksState } from './tasks.reducer';

export const selectFeature = createFeatureSelector<TasksState>(TasksKey);

export const selectTaks = createSelector(
  selectFeature,
  (state: TasksState) => state.tasks
);

export const selectPendingTaks = createSelector(
  selectFeature,
  (state: TasksState) => state.tasks.filter((t) => !t.completed)
);

export const selectCompletedTaks = createSelector(
  selectFeature,
  (state: TasksState) => state.tasks.filter((t) => t.completed)
);

export const selectFilter = createSelector(
  selectFeature,
  (state: TasksState) => state.filter
);

export const selectTasksByFilter = createSelector(
  selectFeature,
  (state: TasksState) => {
    const { filter, tasks } = state;

    if (filter === 'completed') {
      return tasks.filter((t) => t.completed);
    }

    if (filter === 'pending') {
      return tasks.filter((t) => !t.completed);
    }

    return tasks;
  }
);
