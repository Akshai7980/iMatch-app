import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestMomentsPageRoutingModule } from './best-moments-routing.module';

import { BestMomentsPage } from './best-moments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestMomentsPageRoutingModule
  ],
  declarations: [BestMomentsPage]
})
export class BestMomentsPageModule {}
