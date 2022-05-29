import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FansPageRoutingModule } from './fans-routing.module';

import { FansPage } from './fans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FansPageRoutingModule
  ],
  declarations: [FansPage]
})
export class FansPageModule {}
