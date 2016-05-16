import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { County } from './county';
import { CountyService } from './county.service';
import { SearchPipe } from './search-pipe';

@Component({
  selector: 'counties',
  templateUrl: 'app/counties.component.html',
  styleUrls: ['app/counties.component.css'],
  directives: [PaginationControlsCmp],
  pipes: [
    PaginatePipe,
    SearchPipe
  ],
  providers: [PaginationService]
})
export class CountiesComponent implements OnInit {
  counties: any;
  term: any;
  private _router: Router;
  private _routeParams: RouteParams;
  private _countyService: CountyService;

  constructor(
    router: Router,
    routeParams: RouteParams,
    countyService: CountyService) {
      this._router = router;
      this._routeParams = routeParams;
      this._countyService = countyService;
  }

  ngOnInit(): void {
    this.counties = this._countyService.counties$;
    this._countyService.loadCounties();
    this.term = this._routeParams.get('term');
  }

  gotoDetail(county: County): void {
    let link = ['CountyDetail', { id: county.id }];
    this._router.navigate(link);
  }
}
