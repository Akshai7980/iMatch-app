import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestMomentVisitorsCommentPageRoutingModule } from './best-moment-visitors-comment-routing.module';

import { BestMomentVisitorsCommentPage } from './best-moment-visitors-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BestMomentVisitorsCommentPageRoutingModule
  ],
  declarations: [BestMomentVisitorsCommentPage]
})
export class BestMomentVisitorsCommentPageModule {}
