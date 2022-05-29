import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsFansViewPageRoutingModule } from './visitors-fans-view-routing.module';

import { VisitorsFansViewPage } from './visitors-fans-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsFansViewPageRoutingModule
  ],
  declarations: [VisitorsFansViewPage]
})
export class VisitorsFansViewPageModule {}
