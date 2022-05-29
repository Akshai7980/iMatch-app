import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestMomentCommentPageRoutingModule } from './best-moment-comment-routing.module';

import { BestMomentCommentPage } from './best-moment-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BestMomentCommentPageRoutingModule
  ],
  declarations: [BestMomentCommentPage]
})
export class BestMomentCommentPageModule {}
