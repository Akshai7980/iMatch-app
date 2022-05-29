import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatWouldIDoVisitorPage } from './what-would-i-do-visitor.page';

const routes: Routes = [
  {
    path: '',
    component: WhatWouldIDoVisitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatWouldIDoVisitorPageRoutingModule {}
