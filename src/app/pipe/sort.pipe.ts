//FEL HANTERING
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter',
  standalone: true
})
export class SorterPipe implements PipeTransform {
  transform(tasks: any[], sortBy: string): any[] {
    if (!tasks || !sortBy) return tasks;

    return [...tasks].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });
  }
}
