import { Pipe, PipeTransform } from '@angular/core';
import { SanitizationService } from '../shared/sanitization.service';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: SanitizationService) {}

  transform(value: string): any {
    return this.sanitizer.sanitizeHtml(value);
  }
}
