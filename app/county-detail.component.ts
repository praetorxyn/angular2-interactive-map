import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { County } from './county';
import { CountyService } from './county.service';

@Component({
  selector: 'county-detail',
  templateUrl: 'app/county-detail.component.html',
  styleUrls: ['app/county-detail.component.css']
})
export class CountyDetailComponent implements OnInit {
  @Input() county: County;
  private _routeParams: RouteParams;
  private _countyService: CountyService;

  constructor(
    routeParams: RouteParams,
    countyService: CountyService) {
      this._routeParams = routeParams;
      this._countyService = countyService;
  }

  ngOnInit(): void {
    let id = +this._routeParams.get('id');
    this.county = this._countyService.getCounty(id);
  }

  goBack(): void {
    window.history.back();
  }
}
