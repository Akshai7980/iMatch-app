import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeautyFashionPageRoutingModule } from './beauty-fashion-routing.module';

import { BeautyFashionPage } from './beauty-fashion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeautyFashionPageRoutingModule
  ],
  declarations: [BeautyFashionPage]
})
export class BeautyFashionPageModule {}
