import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeadlinersPageRoutingModule } from './headliners-routing.module';

import { HeadlinersPage } from './headliners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadlinersPageRoutingModule
  ],
  declarations: [HeadlinersPage]
})
export class HeadlinersPageModule {}
