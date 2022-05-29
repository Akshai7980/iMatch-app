import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsViewActivityPageRoutingModule } from './visitors-view-activity-routing.module';

import { VisitorsViewActivityPage, PopoverComponent } from './visitors-view-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsViewActivityPageRoutingModule
  ],
  declarations: [VisitorsViewActivityPage, PopoverComponent]
})
export class VisitorsViewActivityPageModule {}
