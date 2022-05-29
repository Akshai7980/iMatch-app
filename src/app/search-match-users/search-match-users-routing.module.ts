import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMatchUsersPage } from './search-match-users.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMatchUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMatchUsersPageRoutingModule {}
