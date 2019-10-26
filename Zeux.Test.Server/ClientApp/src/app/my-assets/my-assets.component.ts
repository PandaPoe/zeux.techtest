import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AssetsService, Asset, AssetType } from 'src/app/assets.service'

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent implements OnInit {

  private assetTypes: Array<AssetType>;
  private assets: Array<Asset>;

  constructor(private route: ActivatedRoute,
      private assetsService:  AssetsService,
      private router: Router) { }

    ngOnInit() {
        this.assetsService.getAssets();
        this.assetsService.getAssetTypes().pipe().subscribe(data => { this.assetTypes = data});

        this.assetsService.currentAssets.subscribe((dataAssets: Array<Asset>) => {
            this.route.data.subscribe(x => this.assets = x.items);
        });

    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.route.data.subscribe(x => this.assets = x.items);
    }});
  }
}

