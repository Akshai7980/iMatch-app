import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsSquadListViewPageRoutingModule } from './visitors-squad-list-view-routing.module';

import { VisitorsSquadListViewPage } from './visitors-squad-list-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsSquadListViewPageRoutingModule
  ],
  declarations: [VisitorsSquadListViewPage]
})
export class VisitorsSquadListViewPageModule {}
