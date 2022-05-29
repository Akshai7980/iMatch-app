import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SquadListInvitationPageRoutingModule } from './squad-list-invitation-routing.module';

import { SquadListInvitationPage } from './squad-list-invitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SquadListInvitationPageRoutingModule
  ],
  declarations: [SquadListInvitationPage]
})
export class SquadListInvitationPageModule {}
