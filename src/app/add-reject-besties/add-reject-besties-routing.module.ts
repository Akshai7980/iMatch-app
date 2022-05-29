import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRejectBestiesPage } from './add-reject-besties.page';

const routes: Routes = [
  {
    path: '',
    component: AddRejectBestiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRejectBestiesPageRoutingModule {}
