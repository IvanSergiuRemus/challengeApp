import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchPipe' })
export class searchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.toLocaleLowerCase().includes(searchText);
    });
  }
}