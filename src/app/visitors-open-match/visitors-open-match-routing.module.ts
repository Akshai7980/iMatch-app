import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsOpenMatchPage, PopoverComponent } from './visitors-open-match.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsOpenMatchPage
  },
  {
    path: '',
    component: PopoverComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsOpenMatchPageRoutingModule {}
