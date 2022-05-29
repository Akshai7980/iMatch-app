import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestMomentsAddPage } from './best-moments-add.page';

const routes: Routes = [
  {
    path: '',
    component: BestMomentsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestMomentsAddPageRoutingModule {}
