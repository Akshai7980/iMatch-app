import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunnyPage } from './funny.page';

const routes: Routes = [
  {
    path: '',
    component: FunnyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FunnyPageRoutingModule {}
