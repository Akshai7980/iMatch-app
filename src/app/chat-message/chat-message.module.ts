import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatMessagePageRoutingModule } from './chat-message-routing.module';

import { ChatMessagePage } from './chat-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChatMessagePageRoutingModule
  ],
  declarations: [ChatMessagePage]
})
export class ChatMessagePageModule {}
