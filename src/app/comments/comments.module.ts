import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';

import { CommentsPage } from './comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CommentsPageRoutingModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
