// #docregion
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(delay(1000), tap(val => this.isLoggedIn = true));
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
