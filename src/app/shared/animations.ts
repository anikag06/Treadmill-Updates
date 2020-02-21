import {
    animation,
    trigger,
    transition,
    animate,
    style,
    state,
} from '@angular/animations';

export const decrementAnimation = animation([
    style({ opacity: 0, transform: 'translateX(-26%)' }),
    animate(
        '200ms ease-in-out',
        style({ opacity: 1, transform: 'translateX(0%)' }),
    ),
]);

export const incrementAnimation = animation([
    style({ opacity: 0, transform: 'translateX(26%)' }),
    animate(
        '200ms ease-in-out',
        style({ opacity: 1, transform: 'translateX(0%)' }),
    ),
]);

export const enterAnimation = animation([
    style({ opacity: 0, transform: 'translateX(50%)' }),
    animate(
        '1000ms ease-in-out',
        style({ opacity: 1, transform: 'translateX(0%)' }),
    ),

]);


export const enterSubmitAnimation = animation([
    style({ opacity: 1, transform: 'translateX(50%)' }),
    animate(
        '200ms ease-in-out',
        style({ opacity: 1, transform: 'translateX(0%)' }),
    ),
]);
