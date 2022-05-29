import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab6/tab6.module').then(m => m.Tab6PageModule)

          },
          {
            path: 'besties',
            loadChildren: () => import('../besties/besties.module').then( m => m.BestiesPageModule)
          },
          {
            path: 'besties-actions',
            loadChildren: () => import('../besties-actions/besties-actions.module').then( m => m.BestiesActionsPageModule)
          },
          {
            path: 'fans',
            loadChildren: () => import('../fans/fans.module').then( m => m.FansPageModule)
          },
          {
            path: 'squad-list',
            loadChildren: () => import('../squad-list/squad-list.module').then( m => m.SquadListPageModule)
          },
        ]
      },
      {
        path: 'tab7',
        loadChildren: () => import('../tab7/tab7.module').then(m => m.Tab7PageModule)
      },
      {
        path: 'tab8',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab8/tab8.module').then(m => m.Tab8PageModule)
          },
          {
            path: 'trending',
            loadChildren: () => import('../trending/trending.module').then(m => m.TrendingPageModule)
          },
          {
            path: 'headliners',
            loadChildren: () => import('../headliners/headliners.module').then(m => m.HeadlinersPageModule)
          },
          {
            path: 'goodies',
            loadChildren: () => import('../goodies/goodies.module').then(m => m.GoodiesPageModule)
          },
          {
            path: 'faq',
            loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
          },
          {
            path: 'help',
            loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule)
          },
          {
            path: 'privacy-policy',
            loadChildren: () => import('../privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
          },
          {
            path: 'about-us',
            loadChildren: () => import('../about-us/about-us.module').then( m => m.AboutUsPageModule)
          },
        ]
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/tab6',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab6',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
