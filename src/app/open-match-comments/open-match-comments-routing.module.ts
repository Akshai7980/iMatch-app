import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenMatchCommentsPage } from './open-match-comments.page';

const routes: Routes = [
  {
    path: '',
    component: OpenMatchCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenMatchCommentsPageRoutingModule {}
