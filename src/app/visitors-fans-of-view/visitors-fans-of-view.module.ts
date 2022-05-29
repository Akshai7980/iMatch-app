import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsFansOfViewPageRoutingModule } from './visitors-fans-of-view-routing.module';

import { VisitorsFansOfViewPage } from './visitors-fans-of-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsFansOfViewPageRoutingModule
  ],
  declarations: [VisitorsFansOfViewPage]
})
export class VisitorsFansOfViewPageModule {}
