import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchChatUserPageRoutingModule } from './search-chat-user-routing.module';

import { SearchChatUserPage } from './search-chat-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchChatUserPageRoutingModule
  ],
  declarations: [SearchChatUserPage]
})
export class SearchChatUserPageModule {}
