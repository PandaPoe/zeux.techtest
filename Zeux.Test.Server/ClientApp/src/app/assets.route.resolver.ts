import { Injectable } from '@angular/core';
import { AssetsService, Asset} from 'src/app/assets.service';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AssetsRouteResolver implements Resolve<Array<Asset>> {
    constructor(private assetService: AssetsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.assetService.currentAssetsValue.filter(x => x.type.name.toLowerCase() == route.params.type.toLowerCase());
  }
}