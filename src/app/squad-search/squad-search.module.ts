import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SquadSearchPageRoutingModule } from './squad-search-routing.module';

import { SquadSearchPage } from './squad-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SquadSearchPageRoutingModule
  ],
  declarations: [SquadSearchPage]
})
export class SquadSearchPageModule {}
