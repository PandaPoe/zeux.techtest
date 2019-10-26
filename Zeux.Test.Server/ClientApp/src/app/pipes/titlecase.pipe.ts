import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'titleCaseString'})
export class TitleCaseString implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
  }
}