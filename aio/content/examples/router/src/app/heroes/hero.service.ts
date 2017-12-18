// #docregion
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';

export class Hero {
  constructor(public id: number, public name: string) { }
}

const HEROES = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];

@Injectable()
export class HeroService {
  getHeroes() { return of(HEROES); }

  getHero(id: number | string) {
    return this.getHeroes()
      // (+) before `id` turns the string into a number
      .pipe(map(heroes => heroes.find(hero => hero.id === +id)));
  }
}
