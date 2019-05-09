import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
} from '@angular/animations';

export const slideInAnimation =
  trigger('myRouteAnimation', [
       transition('* => *', [
            query(':enter, :leave',
                 style({ position: 'fixed', width: '100%' }),
                 { optional: true }),
            group([
                 query(':enter', [
                     style({ transform: 'translateX(100%)' }),
                     style({ filter:   'blur(100px)'}),
                     animate('0.2s ease-in-out',
                     style({ transform: 'translateX(50%)' })),
                     style({ filter:   'blur(50px)'}),
                     animate('0.1s ease-in-out',
                     style({ transform: 'translateX(0%)' })),
                     style({ filter:   'blur(0px)'}),
                 ], { optional: true }),
                 query(':leave', [
                     style({ transform:   'translateX(0%)'}),
                     style({ filter:   'blur(20px)'}),
                     animate('0.3s ease-in-out',
                     style({ transform: 'translateX(-100%)' }))
                 ], { optional: true }),
            ])
       ]),
]);