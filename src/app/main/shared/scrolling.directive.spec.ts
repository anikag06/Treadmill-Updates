import { ScrollingDirective } from './scrolling.directive';
import { ScrollingService } from './scrolling.service';

describe('ScrollingDirective', () => {
  it('should create an instance', () => {
    const scrollService = new ScrollingService();
    const directive = new ScrollingDirective(scrollService);
    expect(directive).toBeTruthy();
  });
});
