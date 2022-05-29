import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsBestiesViewPage } from './visitors-besties-view.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorsBestiesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsBestiesViewPageRoutingModule {}
