import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestiesActionsPage } from './besties-actions.page';

const routes: Routes = [
  {
    path: '',
    component: BestiesActionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestiesActionsPageRoutingModule {}
