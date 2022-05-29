import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalMatchCommentsPageRoutingModule } from './personal-match-comments-routing.module';

import { PersonalMatchCommentsPage } from './personal-match-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonalMatchCommentsPageRoutingModule
  ],
  declarations: [PersonalMatchCommentsPage]
})
export class PersonalMatchCommentsPageModule {}
