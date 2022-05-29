import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SquadListInvitationPage } from './squad-list-invitation.page';

const routes: Routes = [
  {
    path: '',
    component: SquadListInvitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadListInvitationPageRoutingModule {}
