import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsPersonalMatchViewPageRoutingModule } from './visitors-personal-match-view-routing.module';

import { VisitorsPersonalMatchViewPage } from './visitors-personal-match-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsPersonalMatchViewPageRoutingModule
  ],
  declarations: [VisitorsPersonalMatchViewPage]
})
export class VisitorsPersonalMatchViewPageModule {}
