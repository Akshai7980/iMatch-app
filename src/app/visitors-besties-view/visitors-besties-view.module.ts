import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsBestiesViewPageRoutingModule } from './visitors-besties-view-routing.module';

import { VisitorsBestiesViewPage } from './visitors-besties-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsBestiesViewPageRoutingModule
  ],
  declarations: [VisitorsBestiesViewPage]
})
export class VisitorsBestiesViewPageModule {}
