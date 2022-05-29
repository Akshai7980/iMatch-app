import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMatchUsersPageRoutingModule } from './search-match-users-routing.module';

import { SearchMatchUsersPage } from './search-match-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchMatchUsersPageRoutingModule
  ],
  declarations: [SearchMatchUsersPage]
})
export class SearchMatchUsersPageModule {}
