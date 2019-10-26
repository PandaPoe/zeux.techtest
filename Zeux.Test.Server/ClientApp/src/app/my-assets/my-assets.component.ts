import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AssetsService, Asset, AssetType } from 'src/app/assets.service'

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent implements OnInit {

  private type: string;
  private assetTypes: Array<AssetType>;
  private assets: Array<Asset>;

  constructor(private route: ActivatedRoute,
      private http: HttpClient,
      private assetsService:  AssetsService,
      private router: Router) { }

    ngOnInit() {
        this.assetsService.getAssets();
        this.assetsService.getAssetTypes().pipe().subscribe(data => { this.assetTypes = data});

        this.assetsService.currentAssets.subscribe((dataAssets: Array<Asset>) => {
            this.assets = dataAssets;
        });
    this.type = this.route.snapshot.params.type;


    //this.router.events.subscribe((event) => {
    //  if (event instanceof NavigationEnd) {
    //    this.reloadAssets();
    //}});
  }
}

