import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { County } from './county';
import { CountyService } from './county.service';
import { MapComponent } from './map.component';
import { CountyHoverService } from './county-hover.service';
import { MapColorPipe } from './map-color.pipe';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  directives: [
    MapComponent
  ]
})
export class DashboardComponent implements OnInit {
  counties: any;
  scale: number[] = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
  private _router: Router;
  private _countyService: CountyService;
  private _instance: CountyHoverService = CountyHoverService.getInstance();
  private _colorPipe: MapColorPipe = new MapColorPipe();

  constructor(
    router: Router,
    countyService: CountyService) {
    this._router = router;
    this._countyService = countyService;
  }

  ngOnInit(): void {
    this.counties = this._countyService.counties$;
    this._countyService.loadCounties();
  }

  gotoDetail(county: County): void {
    let link = ['CountyDetail', { id: county.id }];
    this._router.navigate(link);
  }

  isActive(county: County): boolean {
    return county.name === this._instance.getHoverCounty();
  }

  scaleColor(n: number): any {
    return {
      'background-color': this._colorPipe.transform(n)
    };
  }

  countyMouseOver(name: string): void {
    $('.county').each((index, value): any => {
      if ($(value).hasClass('active')) {
        $(value).removeClass('active');
      }
    });
    $('[id="' + `${name}` + '"]').addClass('active');
    this._instance.setHoverCounty(name);
  }
}
