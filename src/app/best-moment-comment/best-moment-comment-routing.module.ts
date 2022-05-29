import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestMomentCommentPage } from './best-moment-comment.page';

const routes: Routes = [
  {
    path: '',
    component: BestMomentCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestMomentCommentPageRoutingModule {}
