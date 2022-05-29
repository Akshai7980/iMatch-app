import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurSloganPageRoutingModule } from './our-slogan-routing.module';

import { OurSloganPage } from './our-slogan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OurSloganPageRoutingModule
  ],
  declarations: [OurSloganPage]
})
export class OurSloganPageModule {}
