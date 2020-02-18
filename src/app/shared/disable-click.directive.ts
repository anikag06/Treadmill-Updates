import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableClick]'
})
export class DisableClickDirective {
  disabled!: boolean;

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }
  @Input('appDisableClick') options: any;
  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }



  ngDoCheck(): void {
    // const div = this.renderer.createElement('div');
    // const text = this.renderer.createText('Please complete the survey');
    if (this.options.apply) {
      this.renderer.addClass(this.el.nativeElement, 'is-disabled');
      // this.renderer.setAttribute(this.el.nativeElement, 'matTooltip', "'Please complete the survey'");
    }
  }


  private showTooltip() {
    console.log('tooltip');

  }

}
