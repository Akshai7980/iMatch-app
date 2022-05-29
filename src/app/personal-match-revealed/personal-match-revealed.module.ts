import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalMatchRevealedPageRoutingModule } from './personal-match-revealed-routing.module';

import { PersonalMatchRevealedPage } from './personal-match-revealed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalMatchRevealedPageRoutingModule
  ],
  declarations: [PersonalMatchRevealedPage]
})
export class PersonalMatchRevealedPageModule {}
