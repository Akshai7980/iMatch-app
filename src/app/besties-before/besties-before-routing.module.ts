import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestiesBeforePage } from './besties-before.page';

const routes: Routes = [
  {
    path: '',
    component: BestiesBeforePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestiesBeforePageRoutingModule {}
