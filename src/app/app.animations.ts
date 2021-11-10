import {
  animate,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),

  transition(':enter', [animate(1000)]),
]);

export const grow = trigger('grow', [
  state('void', style({ transform: 'scale(0)' })),

  transition(':enter', [animate('800ms ease-out')]),
]);

export const ease = trigger('ease', [
  state('void', style({ transform: 'translateX(+100%)' })),

  transition(':enter', [animate('600ms ease-out')]),
]);
