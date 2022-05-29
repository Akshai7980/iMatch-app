import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab6Page, PopoverComponent } from './tab6.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page
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
export class Tab6PageRoutingModule {}
