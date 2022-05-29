import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SquadListPageRoutingModule } from './squad-list-routing.module';

import { SquadListPage } from './squad-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SquadListPageRoutingModule
  ],
  declarations: [SquadListPage]
})
export class SquadListPageModule {}
