import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    let localISOTime = (new Date(Date.now())).toISOString().replace('Z', '').replace('T', ' ')
    localISOTime = localISOTime.slice(0, -7)
    return localISOTime
  }

}
