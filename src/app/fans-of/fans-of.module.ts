import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FansOfPageRoutingModule } from './fans-of-routing.module';

import { FansOfPage } from './fans-of.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FansOfPageRoutingModule
  ],
  declarations: [FansOfPage]
})
export class FansOfPageModule {}
