import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestMomentVisitorsViewPage } from './best-moment-visitors-view.page';

const routes: Routes = [
  {
    path: '',
    component: BestMomentVisitorsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestMomentVisitorsViewPageRoutingModule {}
