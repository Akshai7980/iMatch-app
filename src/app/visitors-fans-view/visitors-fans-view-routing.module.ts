import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsFansViewPage } from './visitors-fans-view.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsFansViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsFansViewPageRoutingModule {}
