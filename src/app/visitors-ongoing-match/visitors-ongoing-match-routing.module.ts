import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsOngoingMatchPage } from './visitors-ongoing-match.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsOngoingMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsOngoingMatchPageRoutingModule {}
