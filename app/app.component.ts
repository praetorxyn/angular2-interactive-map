import { Component } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { CountiesComponent } from './counties.component';
import { CountyDetailComponent } from './county-detail.component';
import { CountyService } from './county.service';
import { CountyHoverService } from './county-hover.service';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    CountyService,
    CountyHoverService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/counties',
    name: 'Counties',
    component: CountiesComponent
  },
  {
    path: '/counties/:id',
    name: 'CountyDetail',
    component: CountyDetailComponent
  }
])
export class AppComponent {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  search(term: any): void {
    this._router.navigate(['Counties', { term: term }]);
  }
}
