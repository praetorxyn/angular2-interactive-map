import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
  name: 'map-color'
})
export class MapColorPipe implements PipeTransform {
  transform(value: number): any {
    let r = 255;
    let b = 255 - value;
    let g = value;
    return `rgb(${r}, ${g}, ${b})`;
  }
}
