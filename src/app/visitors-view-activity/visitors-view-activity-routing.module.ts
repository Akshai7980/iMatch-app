import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsViewActivityPage, PopoverComponent } from './visitors-view-activity.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsViewActivityPage
  },
  {
    path: '',
    component: PopoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsViewActivityPageRoutingModule {}
