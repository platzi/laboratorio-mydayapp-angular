import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../interfaces/tareas';

@Pipe({
  name: 'pluralOrSingular'
})
export class PluralOrSingularPipe implements PipeTransform {

  transform(value: number): string {
    return value > 1 || value === 0 ? 's' : '';
  }

}
