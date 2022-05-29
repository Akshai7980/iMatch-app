import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchChatUserPage } from './search-chat-user.page';

const routes: Routes = [
  {
    path: '',
    component: SearchChatUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchChatUserPageRoutingModule {}
