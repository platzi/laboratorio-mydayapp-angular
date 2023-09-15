import { createAction, props } from '@ngrx/store';
import { Filter } from '../models';

export const add = createAction(
  '[Tasks Component] add',
  props<{ title: string }>()
);
export const changeTitle = createAction(
  '[Tasks Component] Change title',
  props<{ title: string; id: string }>()
);
export const remove = createAction(
  '[Tasks Component] remove',
  props<{ id: string }>()
);
export const toggle = createAction(
  '[Tasks Component] toggle',
  props<{ id: string }>()
);
export const clearCompleted = createAction('[Tasks Component] Clear completed');

export const changeFilter = createAction(
  '[Tasks Component] Change filter',
  props<{ filter: Filter }>()
);
