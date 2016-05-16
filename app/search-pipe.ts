import { Pipe, PipeTransform } from 'angular2/core';
import { Router } from 'angular2/router';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  transform(value: any, args: Array<any>): any[] {
    let filter = args[0];

    if ((filter === null) || (filter === undefined) || (filter === '')) {
      return value;
    }

    filter = filter.toLocaleUpperCase();
    let filteredValue = value.filter((item: any) => item.id.toString() === filter ||
                        item.name.toLocaleUpperCase().indexOf(filter) !== -1);

    if (filteredValue.length > 1) {
      return filteredValue;
    }

    this._router.navigate(['CountyDetail', { id: filteredValue[0].id }]);
  }
}
