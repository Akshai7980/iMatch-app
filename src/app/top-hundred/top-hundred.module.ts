import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopHundredPageRoutingModule } from './top-hundred-routing.module';

import { TopHundredPage } from './top-hundred.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopHundredPageRoutingModule
  ],
  declarations: [TopHundredPage]
})
export class TopHundredPageModule {}
