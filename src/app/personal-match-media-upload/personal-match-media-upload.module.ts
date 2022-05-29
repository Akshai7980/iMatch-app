import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalMatchMediaUploadPageRoutingModule } from './personal-match-media-upload-routing.module';

import { PersonalMatchMediaUploadPage } from './personal-match-media-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonalMatchMediaUploadPageRoutingModule
  ],
  declarations: [PersonalMatchMediaUploadPage]
})
export class PersonalMatchMediaUploadPageModule {}
