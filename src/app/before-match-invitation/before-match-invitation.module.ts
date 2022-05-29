import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeforeMatchInvitationPageRoutingModule } from './before-match-invitation-routing.module';

import { BeforeMatchInvitationPage } from './before-match-invitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BeforeMatchInvitationPageRoutingModule
  ],
  declarations: [BeforeMatchInvitationPage]
})
export class BeforeMatchInvitationPageModule {}
