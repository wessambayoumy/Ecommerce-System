import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class FilterPipe implements PipeTransform {
  transform(args: any[], value: string): any[] {
    return args.filter(
      (s) =>
        s.title.toLowerCase().includes(value.toLowerCase()) ||
        s.category.name.toLowerCase().includes(value.toLowerCase()) ||
        s.brand.name.toLowerCase().includes(value.toLowerCase())
    );
  }
}
