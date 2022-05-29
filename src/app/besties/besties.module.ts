import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestiesPageRoutingModule } from './besties-routing.module';

import { BestiesPage } from './besties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BestiesPageRoutingModule
  ],
  declarations: [BestiesPage]
})
export class BestiesPageModule {}
