import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LetterPage } from './letter.page';

const routes: Routes = [
  {
    path: '',
    component: LetterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetterPageRoutingModule {}
