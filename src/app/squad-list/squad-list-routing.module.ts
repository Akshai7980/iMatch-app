import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SquadListPage } from './squad-list.page';

const routes: Routes = [
  {
    path: '',
    component: SquadListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadListPageRoutingModule {}
