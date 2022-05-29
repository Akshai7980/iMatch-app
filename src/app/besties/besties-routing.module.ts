import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestiesPage } from './besties.page';

const routes: Routes = [
  {
    path: '',
    component: BestiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestiesPageRoutingModule {}
