import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodiesPage } from './goodies.page';

const routes: Routes = [
  {
    path: '',
    component: GoodiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodiesPageRoutingModule {}
