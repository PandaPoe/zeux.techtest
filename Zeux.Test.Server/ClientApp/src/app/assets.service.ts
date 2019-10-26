import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AssetsService {
    private currentAssetsSubject: BehaviorSubject<Array<Asset>>;
    public currentAssets: Observable<Array<Asset>>;

    constructor(private http: HttpClient) {
        this.currentAssetsSubject = new BehaviorSubject<Array<Asset>>(JSON.parse(localStorage.getItem('selectedAssets')));
        this.currentAssets = this.currentAssetsSubject.asObservable();
    }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    public get currentAssetsValue(): Array<Asset> {
        return this.currentAssetsSubject.value;
    }

    getAssetTypes() {
        return this.http.get<Array<AssetType>>('/api/asset/GetTypes', this.httpOptions)
            .pipe(map(dataAssetTypes => {
              return dataAssetTypes;
          }));
    }

    getAssets() {
        const uriAsset = '/api/asset/Get/all'
        return this.http.get<Array<Asset>>(uriAsset, this.httpOptions)
            .subscribe((dataAssets: Array<Asset>) => {
                if (dataAssets) {
                    localStorage.setItem('selectedAssets', JSON.stringify(dataAssets));
                }
                console.log(dataAssets);
                return dataAssets;
            });
    }

}

export class AssetType {
    constructor(
        public id: number,
        public name: string) { }
}

export class Asset {
    constructor(
        public id: number,
        public name: string,
        public percent: number,
        public sum: number,
        public type: AssetType,
        public assetTypeName: string) { }
}