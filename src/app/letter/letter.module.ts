import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LetterPageRoutingModule } from './letter-routing.module';

import { LetterPage } from './letter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LetterPageRoutingModule
  ],
  declarations: [LetterPage]
})
export class LetterPageModule {}
