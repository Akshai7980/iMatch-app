import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurStoryPageRoutingModule } from './our-story-routing.module';

import { OurStoryPage } from './our-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurStoryPageRoutingModule
  ],
  declarations: [OurStoryPage]
})
export class OurStoryPageModule {}
