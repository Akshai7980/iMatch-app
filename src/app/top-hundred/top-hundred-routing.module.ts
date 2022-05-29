import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopHundredPage } from './top-hundred.page';

const routes: Routes = [
  {
    path: '',
    component: TopHundredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopHundredPageRoutingModule {}
