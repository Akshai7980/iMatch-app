import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeadlinersPage } from './headliners.page';

const routes: Routes = [
  {
    path: '',
    component: HeadlinersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeadlinersPageRoutingModule {}
