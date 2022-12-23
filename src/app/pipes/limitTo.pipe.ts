import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: any, limit: number): any {
    let trail = '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
