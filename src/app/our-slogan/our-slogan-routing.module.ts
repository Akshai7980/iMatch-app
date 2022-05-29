import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurSloganPage } from './our-slogan.page';

const routes: Routes = [
  {
    path: '',
    component: OurSloganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurSloganPageRoutingModule {}
