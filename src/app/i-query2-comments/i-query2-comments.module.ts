import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IQuery2CommentsPageRoutingModule } from './i-query2-comments-routing.module';

import { IQuery2CommentsPage } from './i-query2-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IQuery2CommentsPageRoutingModule
  ],
  declarations: [IQuery2CommentsPage]
})
export class IQuery2CommentsPageModule {}
