// #docregion
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

@Component({
  selector: 'app-hero-message',
  template: `
    <h2>Async Hero Message and AsyncPipe</h2>
    <p>Message: {{ message$ | async }}</p>
    <button (click)="resend()">Resend</button>`,
})
export class HeroAsyncMessageComponent {
  message$: Observable<string>;

  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];

  constructor() { this.resend(); }

  resend() {
    this.message$ = interval(500)
      .pipe(
        map(i => this.messages[i]),
        take(this.messages.length)
      );
  }
}
// #enddocregion

// Alternative message$ formula:
// this.message$ = Observable.fromArray(this.messages)
//   .map(message => Observable.timer(500).map(() => message))
//   .concatAll();
