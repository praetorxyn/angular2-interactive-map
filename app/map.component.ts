import { Component, Input, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { County } from './county';
import { CountyService } from './county.service';
import { CountyHoverService } from './county-hover.service';
import { MapColorPipe } from './map-color.pipe';

@Component({
  selector: 'svg-map',
  templateUrl: 'Blank_Map_of_New_Mexico.svg',
  styleUrls: ['app/map.component.css']
})
export class MapComponent implements OnInit {
  @Input() counties: any;
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
    this.counties.subscribe((counties: Array<County>) => {
      counties.forEach((county: County) => {
        let element = $('[id="' + `${county.name}` + '"]');
        let elementName = element.attr('id');
        element.attr('fill', this._colorPipe.transform(county.projects));
        element.click((e: any) => this.gotoDetail(county));
        element.hover((e: any) => this.countyMouseOver(elementName));
      });
    });
  }

  isActive(name: string): boolean {
    return this._instance.getHoverCounty() === name;
  }

  gotoDetail(county: County): void {
    let link = ['CountyDetail', { id: county.id }];
    this._router.navigate(link);
  }

  countyMouseOver(name: string): void {
    $('.county').each((index, value): any => {
      if ($(value).hasClass('active')) {
        $(value).removeClass('active');
      }
    });
    this._instance.setHoverCounty(name);
  }
}
