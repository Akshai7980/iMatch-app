import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalMatchPage, PopoverComponent, SenderPopoverComponent, ReceiverPopoverComponent,
          SendMatchComponent, RevealedCountComponent, CountComponent } from './personal-match.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalMatchPage
  },
  {
    path: '',
    component: PopoverComponent,
  },
  {
    path: '',
    component: SenderPopoverComponent,
  },
  {
    path: '',
    component: ReceiverPopoverComponent,
  },
  {
    path: '',
    component: SendMatchComponent,
  },
  {
    path: '',
    component: RevealedCountComponent,
  },
  {
    path: '',
    component: CountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalMatchPageRoutingModule {}
