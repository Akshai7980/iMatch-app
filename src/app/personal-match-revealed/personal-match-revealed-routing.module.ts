import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalMatchRevealedPage } from './personal-match-revealed.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalMatchRevealedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalMatchRevealedPageRoutingModule {}
