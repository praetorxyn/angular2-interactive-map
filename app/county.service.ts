import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

import { County } from './county';
import { COUNTIES } from './mock-counties';

@Injectable()
export class CountyService {
  counties$: Observable<County[]>;
  private _counties$: BehaviorSubject<County[]>;

  constructor() {
    this._counties$ = new BehaviorSubject([]);
    this.counties$ = this._counties$.asObservable();
  }

  loadCounties(): void {
    Observable.of(COUNTIES).subscribe(
      (counties: County[]) => {
        if (!this._counties$.getValue().length) {
          counties.forEach((county: County) =>
          this._counties$.getValue().push(county));
        }
        this._counties$.next(this._counties$.getValue());
      },
      (error: any) => console.log('Unable to retrieve counties: ', error));
  }

  getCounties(): County[] {
    return this._counties$.getValue();
  }

  getCounty(id: number): County {
    return this._counties$.getValue().filter((county: County) => county.id === id)[0];
  }
}
