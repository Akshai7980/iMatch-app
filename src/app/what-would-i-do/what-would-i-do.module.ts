import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatWouldIDoPageRoutingModule } from './what-would-i-do-routing.module';

import { WhatWouldIDoPage } from './what-would-i-do.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    WhatWouldIDoPageRoutingModule
  ],
  declarations: [WhatWouldIDoPage]
})
export class WhatWouldIDoPageModule {}
