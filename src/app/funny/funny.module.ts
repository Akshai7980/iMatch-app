import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunnyPageRoutingModule } from './funny-routing.module';

import { FunnyPage } from './funny.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FunnyPageRoutingModule
  ],
  declarations: [FunnyPage]
})
export class FunnyPageModule {}
