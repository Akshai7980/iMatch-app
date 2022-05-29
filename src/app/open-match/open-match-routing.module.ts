import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenMatchPage, PopoverComponent } from './open-match.page';

const routes: Routes = [
  {
    path: '',
    component: OpenMatchPage,
  },
  {
    path: '',
    component: PopoverComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenMatchPageRoutingModule {}
