import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsFansOfViewPage } from './visitors-fans-of-view.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsFansOfViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsFansOfViewPageRoutingModule {}
