import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutPopoverPage } from './logout-popover.page';

const routes: Routes = [
  {
    path: '',
    component: LogoutPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutPopoverPageRoutingModule {}
