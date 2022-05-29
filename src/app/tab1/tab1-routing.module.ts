import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page, 
  // PopoverComponent 
} from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  // {
  //   path: '',
  //   component: PopoverComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
