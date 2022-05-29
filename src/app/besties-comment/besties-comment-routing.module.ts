import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestiesCommentPage } from './besties-comment.page';

const routes: Routes = [
  {
    path: '',
    component: BestiesCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestiesCommentPageRoutingModule {}
