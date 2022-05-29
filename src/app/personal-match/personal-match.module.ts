import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalMatchPageRoutingModule } from './personal-match-routing.module';

import { PersonalMatchPage, PopoverComponent, SenderPopoverComponent, ReceiverPopoverComponent,
         SendMatchComponent, RevealedCountComponent, CountComponent } from './personal-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonalMatchPageRoutingModule
  ],
  declarations: [PersonalMatchPage, PopoverComponent, SenderPopoverComponent, ReceiverPopoverComponent,
    SendMatchComponent, RevealedCountComponent, CountComponent]
})
export class PersonalMatchPageModule {}
