import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IQueryCommentsPageRoutingModule } from './i-query-comments-routing.module';

import { IQueryCommentsPage } from './i-query-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IQueryCommentsPageRoutingModule
  ],
  declarations: [IQueryCommentsPage]
})
export class IQueryCommentsPageModule {}
