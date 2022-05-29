import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestiesBeforePageRoutingModule } from './besties-before-routing.module';

import { BestiesBeforePage } from './besties-before.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestiesBeforePageRoutingModule
  ],
  declarations: [BestiesBeforePage]
})
export class BestiesBeforePageModule {}
