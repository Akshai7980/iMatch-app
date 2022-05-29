import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFansPage } from './search-fans.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFansPageRoutingModule {}
