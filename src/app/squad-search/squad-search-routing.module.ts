import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SquadSearchPage } from './squad-search.page';

const routes: Routes = [
  {
    path: '',
    component: SquadSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadSearchPageRoutingModule {}
