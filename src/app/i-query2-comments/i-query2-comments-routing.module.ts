import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IQuery2CommentsPage } from './i-query2-comments.page';

const routes: Routes = [
  {
    path: '',
    component: IQuery2CommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IQuery2CommentsPageRoutingModule {}
