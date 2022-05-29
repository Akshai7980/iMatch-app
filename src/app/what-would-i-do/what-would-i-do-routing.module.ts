import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatWouldIDoPage } from './what-would-i-do.page';

const routes: Routes = [
  {
    path: '',
    component: WhatWouldIDoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatWouldIDoPageRoutingModule {}
