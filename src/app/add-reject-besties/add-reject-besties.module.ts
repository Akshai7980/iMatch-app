import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRejectBestiesPageRoutingModule } from './add-reject-besties-routing.module';

import { AddRejectBestiesPage } from './add-reject-besties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRejectBestiesPageRoutingModule
  ],
  declarations: [AddRejectBestiesPage]
})
export class AddRejectBestiesPageModule {}
