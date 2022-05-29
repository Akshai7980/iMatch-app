import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalMatchCommentsPage } from './personal-match-comments.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalMatchCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalMatchCommentsPageRoutingModule {}
