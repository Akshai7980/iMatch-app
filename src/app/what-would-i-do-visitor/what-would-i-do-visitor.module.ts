import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatWouldIDoVisitorPageRoutingModule } from './what-would-i-do-visitor-routing.module';

import { WhatWouldIDoVisitorPage } from './what-would-i-do-visitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatWouldIDoVisitorPageRoutingModule
  ],
  declarations: [WhatWouldIDoVisitorPage]
})
export class WhatWouldIDoVisitorPageModule {}
