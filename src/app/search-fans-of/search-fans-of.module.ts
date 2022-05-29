import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFansOfPageRoutingModule } from './search-fans-of-routing.module';

import { SearchFansOfPage } from './search-fans-of.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchFansOfPageRoutingModule
  ],
  declarations: [SearchFansOfPage]
})
export class SearchFansOfPageModule {}
