import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
  animations: [
    trigger('showHide', [
      state(
        'show',
        style({
          opacity: 1,
        }),
      ),
      transition('* => show', [animate('0.4s')]),
    ]),
  ],
})
export class ToastNotificationComponent implements OnInit {
  title!: string;
  body!: string;
  constructor(private host: ElementRef<HTMLElement>) {}
  ngOnInit() {}
  onClose() {
    this.host.nativeElement.remove();
  }
}
