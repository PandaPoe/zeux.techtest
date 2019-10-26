import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAssetsComponent } from 'src/app/my-assets/my-assets.component';
import { OpportunitiesComponent } from 'src/app/opportunities/opportunities.component';
import { AssetsRouteResolver } from 'src/app/assets.route.resolver';

const routes: Routes = [
  {
    path: 'myassets/:type',
        component: MyAssetsComponent,
        resolve: { items: AssetsRouteResolver }
  },
  {
    path: 'opportunities',
    component: OpportunitiesComponent
  },
  {
    path: '**',
    redirectTo: 'myassets/all'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AssetsRouteResolver]
})
export class AppRoutingModule { }
