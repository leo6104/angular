import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { Hero }       from './hero.model';

@Injectable()
export class HeroService {

  constructor(private http: Http) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get('api/heroes')
                    .pipe(map(resp => resp.json().data as Hero[]));
  }
}
