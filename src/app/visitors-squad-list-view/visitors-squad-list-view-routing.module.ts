import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsSquadListViewPage } from './visitors-squad-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsSquadListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsSquadListViewPageRoutingModule {}
