import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtEntertainmentPage } from './art-entertainment.page';

const routes: Routes = [
  {
    path: '',
    component: ArtEntertainmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtEntertainmentPageRoutingModule {}
