/* tslint:disable: member-ordering forin */
// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';

// #docregion rxjs-imports
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';

// #docregion import-subject
import { Subject } from 'rxjs/Subject';
// #enddocregion import-subject

import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'my-wiki-smart',
  template: `
    <h1>Smarter Wikipedia Demo</h1>
    <p>Search when typing stops</p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>`,
  providers: [ WikipediaService ]
})
export class WikiSmartComponent implements OnInit {
  items: Observable<string[]>;

  constructor (private wikipediaService: WikipediaService) {}

  // #docregion subject
  private searchTermStream = new Subject<string>();
  search(term: string) { this.searchTermStream.next(term); }
  // #enddocregion subject

  ngOnInit() {
    // #docregion observable-operators
    this.items = this.searchTermStream
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.wikipediaService.search(term))
      );
    // #enddocregion observable-operators
  }
}
