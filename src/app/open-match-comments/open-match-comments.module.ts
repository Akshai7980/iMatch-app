import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenMatchCommentsPageRoutingModule } from './open-match-comments-routing.module';

import { OpenMatchCommentsPage } from './open-match-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OpenMatchCommentsPageRoutingModule
  ],
  declarations: [OpenMatchCommentsPage]
})
export class OpenMatchCommentsPageModule {}
