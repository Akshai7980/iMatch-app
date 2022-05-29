import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestiesActionsPageRoutingModule } from './besties-actions-routing.module';

import { BestiesActionsPage } from './besties-actions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestiesActionsPageRoutingModule
  ],
  declarations: [BestiesActionsPage]
})
export class BestiesActionsPageModule {}
