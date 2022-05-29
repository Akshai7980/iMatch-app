import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestMomentsAddPageRoutingModule } from './best-moments-add-routing.module';

import { BestMomentsAddPage } from './best-moments-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BestMomentsAddPageRoutingModule
  ],
  declarations: [BestMomentsAddPage]
})
export class BestMomentsAddPageModule {}
