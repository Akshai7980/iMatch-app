import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsPersonalMatchViewPage } from './visitors-personal-match-view.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsPersonalMatchViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsPersonalMatchViewPageRoutingModule {}
