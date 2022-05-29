import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeautyFashionPage } from './beauty-fashion.page';

const routes: Routes = [
  {
    path: '',
    component: BeautyFashionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeautyFashionPageRoutingModule {}
