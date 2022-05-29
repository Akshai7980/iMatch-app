import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsOngoingMatchPageRoutingModule } from './visitors-ongoing-match-routing.module';

import { VisitorsOngoingMatchPage } from './visitors-ongoing-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsOngoingMatchPageRoutingModule
  ],
  declarations: [VisitorsOngoingMatchPage]
})
export class VisitorsOngoingMatchPageModule {}
