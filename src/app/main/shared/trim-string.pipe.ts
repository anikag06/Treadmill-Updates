import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimString'
})

export class TrimStringPipe implements PipeTransform {

    transform(value: string, length: number) {
        if (value.length > length) {
            const trimLength = value.length - length;
            const newValue = value.slice(0, -trimLength) + ' ...';
            return newValue;
        } else {
            return value;
        }
    }
}
