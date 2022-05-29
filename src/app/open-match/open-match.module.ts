import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenMatchPageRoutingModule } from './open-match-routing.module';

import { OpenMatchPage, PopoverComponent } from './open-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenMatchPageRoutingModule
  ],
  declarations: [OpenMatchPage, PopoverComponent],
  // entryComponents: [PopoverComponent],
})
export class OpenMatchPageModule {}
