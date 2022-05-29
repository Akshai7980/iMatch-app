import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IQueryCommentsPage } from './i-query-comments.page';

const routes: Routes = [
  {
    path: '',
    component: IQueryCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IQueryCommentsPageRoutingModule {}
