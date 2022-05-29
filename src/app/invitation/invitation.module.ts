import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationPageRoutingModule } from './invitation-routing.module';

import { InvitationPage } from './invitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InvitationPageRoutingModule
  ],
  declarations: [InvitationPage]
})
export class InvitationPageModule {}
