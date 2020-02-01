import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]',
})
export class LazyLoadingImageDirective implements OnDestroy {
  @HostBinding('attr.src') srcAttr = null;
  @Input() src!: string;
  observer!: IntersectionObserver;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  ngOnChanges() {
    this.loadImage();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    });
    this.observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    // @ts-ignore
    this.srcAttr = this.src;
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
