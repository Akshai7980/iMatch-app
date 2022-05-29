import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeforeMatchInvitationPage } from './before-match-invitation.page';

const routes: Routes = [
  {
    path: '',
    component: BeforeMatchInvitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeforeMatchInvitationPageRoutingModule {}
