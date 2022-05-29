import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestMomentVisitorsViewPageRoutingModule } from './best-moment-visitors-view-routing.module';

import { BestMomentVisitorsViewPage } from './best-moment-visitors-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestMomentVisitorsViewPageRoutingModule
  ],
  declarations: [BestMomentVisitorsViewPage]
})
export class BestMomentVisitorsViewPageModule {}
