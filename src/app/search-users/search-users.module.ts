import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchUsersPageRoutingModule } from './search-users-routing.module';

import { SearchUsersPage } from './search-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchUsersPageRoutingModule
  ],
  declarations: [SearchUsersPage]
})
export class SearchUsersPageModule {}
