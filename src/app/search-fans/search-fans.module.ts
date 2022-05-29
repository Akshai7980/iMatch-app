import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFansPageRoutingModule } from './search-fans-routing.module';

import { SearchFansPage } from './search-fans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchFansPageRoutingModule
  ],
  declarations: [SearchFansPage]
})
export class SearchFansPageModule {}
