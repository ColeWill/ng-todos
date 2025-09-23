import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectFlattener',
  standalone: true,
})
export class ObjectFlattenerPipe implements PipeTransform {
  transform(obj: any, parentKey: string = ''): { key: string; value: any }[] {
    const flatItems: { key: string; value: any }[] = [];

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          flatItems.push(...this.transform(value, newKey));
        } else {
          flatItems.push({ key: newKey, value: value });
        }
      }
    }
    return flatItems;
  }
}
