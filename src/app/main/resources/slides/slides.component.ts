import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { SlideService } from './slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDirective } from './form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  @ViewChild(FormDirective, {static: false}) formHost!: FormDirective;

  constructor(
    private slideService: SlideService,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  slide!: any;
  sanitizedUrl!: SafeUrl;

  ngOnInit() {
    this.slideService.getSlide(1, 1)
      .subscribe(
        (data => {
          this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
          this.loadForm();
          return this.slide = data;
        })
      );
  }

  loadForm() {
    const currentForm = ProblemSolvingWorksheetsComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentForm);
    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
