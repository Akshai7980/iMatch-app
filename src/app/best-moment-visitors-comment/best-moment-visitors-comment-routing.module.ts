import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestMomentVisitorsCommentPage } from './best-moment-visitors-comment.page';

const routes: Routes = [
  {
    path: '',
    component: BestMomentVisitorsCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestMomentVisitorsCommentPageRoutingModule {}
