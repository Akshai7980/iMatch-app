import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestiesSearchPageRoutingModule } from './besties-search-routing.module';

import { BestiesSearchPage, PopoverComponent } from './besties-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BestiesSearchPageRoutingModule
  ],
  declarations: [BestiesSearchPage, PopoverComponent]
})
export class BestiesSearchPageModule {}
