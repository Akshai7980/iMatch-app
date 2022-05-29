import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestiesCommentPageRoutingModule } from './besties-comment-routing.module';

import { BestiesCommentPage } from './besties-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestiesCommentPageRoutingModule
  ],
  declarations: [BestiesCommentPage]
})
export class BestiesCommentPageModule {}
