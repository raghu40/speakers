import { Pipe, PipeTransform } from '@angular/core';
import { Speaker } from 'src/app/core/services/state/models/speaker.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Speaker[], searchText: string): Speaker[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((items) => {
      return Object.values(items).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchText);
        }
        return false;
      });
    });
  }
}
