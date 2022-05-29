import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodiesPageRoutingModule } from './goodies-routing.module';

import { GoodiesPage } from './goodies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodiesPageRoutingModule
  ],
  declarations: [GoodiesPage]
})
export class GoodiesPageModule {}
