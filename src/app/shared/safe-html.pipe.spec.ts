import { SafeHtmlPipe } from './safe-html.pipe';
import { SanitizationService } from '../main/shared/sanitization.service';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const sanitizer = new SanitizationService();
    const pipe = new SafeHtmlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
