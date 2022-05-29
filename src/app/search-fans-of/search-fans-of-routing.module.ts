import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFansOfPage } from './search-fans-of.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFansOfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFansOfPageRoutingModule {}
