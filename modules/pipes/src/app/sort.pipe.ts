import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, property: string): unknown {
    return value.sort((n1, n2) => {
      if (n1[property] > n2[property]) {
        return 1;
      }
      if (n1[property] < n2[property]) {

        return -1
      }
      return 0;
    });
  }
}
