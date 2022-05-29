import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutPopoverPageRoutingModule } from './logout-popover-routing.module';

import { LogoutPopoverPage } from './logout-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutPopoverPageRoutingModule
  ],
  declarations: [LogoutPopoverPage]
})
export class LogoutPopoverPageModule {}
