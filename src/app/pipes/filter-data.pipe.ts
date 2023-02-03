import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../interfaces/task.interface';

@Pipe({
  name: 'filterData',
})
export class FilterDataPipe implements PipeTransform {
  transform(list: Tarea[], path: string): Tarea[] {
    let listTemp = [...list];
    if (path === '/completed') {
      listTemp = list.filter((tarea) => tarea.completed === true);
    }
    if (path === '/pending') {
      listTemp = list.filter((tarea) => tarea.completed === false);
    }
    return listTemp;
  }
}
