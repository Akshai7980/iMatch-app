import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestiesSearchPage, PopoverComponent } from './besties-search.page';

const routes: Routes = [
  {
    path: '',
    component: BestiesSearchPage
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
export class BestiesSearchPageRoutingModule {}
