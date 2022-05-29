import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtEntertainmentPageRoutingModule } from './art-entertainment-routing.module';

import { ArtEntertainmentPage } from './art-entertainment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtEntertainmentPageRoutingModule
  ],
  declarations: [ArtEntertainmentPage]
})
export class ArtEntertainmentPageModule {}
