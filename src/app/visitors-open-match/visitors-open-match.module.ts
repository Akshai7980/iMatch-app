import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsOpenMatchPageRoutingModule } from './visitors-open-match-routing.module';

import { VisitorsOpenMatchPage, PopoverComponent } from './visitors-open-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsOpenMatchPageRoutingModule
  ],
  declarations: [VisitorsOpenMatchPage, PopoverComponent]
})
export class VisitorsOpenMatchPageModule {}
