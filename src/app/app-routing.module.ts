import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./terms-of-service/terms-of-service.module').then( m => m.TermsOfServicePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'trending',
    loadChildren: () => import('./trending/trending.module').then( m => m.TrendingPageModule)
  },
  {
    path: 'headliners',
    loadChildren: () => import('./headliners/headliners.module').then( m => m.HeadlinersPageModule)
  },
  {
    path: 'goodies',
    loadChildren: () => import('./goodies/goodies.module').then( m => m.GoodiesPageModule)
  },
  {
    path: 'besties',
    loadChildren: () => import('./besties/besties.module').then( m => m.BestiesPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'blog-detail',
    loadChildren: () => import('./blog-detail/blog-detail.module').then( m => m.BlogDetailPageModule)
  },
  {
    path: 'besties-actions',
    loadChildren: () => import('./besties-actions/besties-actions.module').then( m => m.BestiesActionsPageModule)
  },
  {
    path: 'fans',
    loadChildren: () => import('./fans/fans.module').then( m => m.FansPageModule)
  },
  {
    path: 'fans-of',
    loadChildren: () => import('./fans-of/fans-of.module').then( m => m.FansOfPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chat-message',
    loadChildren: () => import('./chat-message/chat-message.module').then( m => m.ChatMessagePageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'invitation',
    loadChildren: () => import('./invitation/invitation.module').then( m => m.InvitationPageModule)
  },
  {
    path: 'group-members',
    loadChildren: () => import('./group-members/group-members.module').then( m => m.GroupMembersPageModule)
  },
  {
    path: 'besties-before',
    loadChildren: () => import('./besties-before/besties-before.module').then( m => m.BestiesBeforePageModule)
  },
  {
    path: 'top-hundred',
    loadChildren: () => import('./top-hundred/top-hundred.module').then( m => m.TopHundredPageModule)
  },
  {
    path: 'what-would-i-do',
    loadChildren: () => import('./what-would-i-do/what-would-i-do.module').then( m => m.WhatWouldIDoPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'squad-list',
    loadChildren: () => import('./squad-list/squad-list.module').then( m => m.SquadListPageModule)
  },
  {
    path: 'besties-search',
    loadChildren: () => import('./besties-search/besties-search.module').then( m => m.BestiesSearchPageModule)
  },
  {
    path: 'squad-search',
    loadChildren: () => import('./squad-search/squad-search.module').then( m => m.SquadSearchPageModule)
  },
  {
    path: 'our-story',
    loadChildren: () => import('./our-story/our-story.module').then( m => m.OurStoryPageModule)
  },
  {
    path: 'our-slogan',
    loadChildren: () => import('./our-slogan/our-slogan.module').then( m => m.OurSloganPageModule)
  },
  {
    path: 'letter',
    loadChildren: () => import('./letter/letter.module').then( m => m.LetterPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },

  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'before-match-invitation',
    loadChildren: () => import('./before-match-invitation/before-match-invitation.module').then( m => m.BeforeMatchInvitationPageModule)
  },
  {
    path: 'open-match',
    loadChildren: () => import('./open-match/open-match.module').then( m => m.OpenMatchPageModule)
  },
  {
    path: 'search-fans',
    loadChildren: () => import('./search-fans/search-fans.module').then( m => m.SearchFansPageModule)
  },
  {
    path: 'search-fans-of',
    loadChildren: () => import('./search-fans-of/search-fans-of.module').then( m => m.SearchFansOfPageModule)
  },
  {
    path: 'search-users',
    loadChildren: () => import('./search-users/search-users.module').then( m => m.SearchUsersPageModule)
  },
  {
    path: 'visitors-view-activity',
    loadChildren: () => import('./visitors-view-activity/visitors-view-activity.module').then( m => m.VisitorsViewActivityPageModule)
  },
  {
    path: 'search-match-users',
    loadChildren: () => import('./search-match-users/search-match-users.module').then( m => m.SearchMatchUsersPageModule)
  },
  {
    path: 'what-would-i-do-visitor',
    loadChildren: () => import('./what-would-i-do-visitor/what-would-i-do-visitor.module').then( m => m.WhatWouldIDoVisitorPageModule)
  },
  {
    path: 'i-query-comments',
    loadChildren: () => import('./i-query-comments/i-query-comments.module').then( m => m.IQueryCommentsPageModule)
  },
  {
    path: 'i-query2-comments',
    loadChildren: () => import('./i-query2-comments/i-query2-comments.module').then( m => m.IQuery2CommentsPageModule)
  },
  {
    path: 'open-match-comments',
    loadChildren: () => import('./open-match-comments/open-match-comments.module').then( m => m.OpenMatchCommentsPageModule)
  },
  {
    path: 'funny',
    loadChildren: () => import('./funny/funny.module').then( m => m.FunnyPageModule)
  },
  {
    path: 'art-entertainment',
    loadChildren: () => import('./art-entertainment/art-entertainment.module').then( m => m.ArtEntertainmentPageModule)
  },
  {
    path: 'beauty-fashion',
    loadChildren: () => import('./beauty-fashion/beauty-fashion.module').then( m => m.BeautyFashionPageModule)
  },
  {
    path: 'visitors-fans-view',
    loadChildren: () => import('./visitors-fans-view/visitors-fans-view.module').then( m => m.VisitorsFansViewPageModule)
  },
  {
    path: 'visitors-fans-of-view',
    loadChildren: () => import('./visitors-fans-of-view/visitors-fans-of-view.module').then( m => m.VisitorsFansOfViewPageModule)
  },
  {
    path: 'visitors-besties-view',
    loadChildren: () => import('./visitors-besties-view/visitors-besties-view.module').then( m => m.VisitorsBestiesViewPageModule)
  },
  {
    path: 'visitors-squad-list-view',
    loadChildren: () => import('./visitors-squad-list-view/visitors-squad-list-view.module').then( m => m.VisitorsSquadListViewPageModule)
  },
  {
    path: 'logout-popover',
    loadChildren: () => import('./logout-popover/logout-popover.module').then( m => m.LogoutPopoverPageModule)
  },
  {
    path: 'search-chat-user',
    loadChildren: () => import('./search-chat-user/search-chat-user.module').then( m => m.SearchChatUserPageModule)
  },
  {
    path: 'best-moments',
    loadChildren: () => import('./best-moments/best-moments.module').then( m => m.BestMomentsPageModule)
  },
  {
    path: 'best-moments-add',
    loadChildren: () => import('./best-moments-add/best-moments-add.module').then( m => m.BestMomentsAddPageModule)
  },
  {
    path: 'best-moment-visitors-view',
    loadChildren: () => import('./best-moment-visitors-view/best-moment-visitors-view.module').then( m => m.BestMomentVisitorsViewPageModule)
  },
  {
    path: 'best-moment-visitors-comment',
    loadChildren: () => import('./best-moment-visitors-comment/best-moment-visitors-comment.module').then( m => m.BestMomentVisitorsCommentPageModule)
  },
  {
    path: 'best-moment-comment',
    loadChildren: () => import('./best-moment-comment/best-moment-comment.module').then( m => m.BestMomentCommentPageModule)
  },  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'personal-match',
    loadChildren: () => import('./personal-match/personal-match.module').then( m => m.PersonalMatchPageModule)
  },
  {
    path: 'visitors-personal-match-view',
    loadChildren: () => import('./visitors-personal-match-view/visitors-personal-match-view.module').then( m => m.VisitorsPersonalMatchViewPageModule)
  },
  {
    path: 'personal-match-comments',
    loadChildren: () => import('./personal-match-comments/personal-match-comments.module').then( m => m.PersonalMatchCommentsPageModule)
  },
  {
    path: 'visitors-ongoing-match',
    loadChildren: () => import('./visitors-ongoing-match/visitors-ongoing-match.module').then( m => m.VisitorsOngoingMatchPageModule)
  },
  {
    path: 'personal-match-media-upload',
    loadChildren: () => import('./personal-match-media-upload/personal-match-media-upload.module').then( m => m.PersonalMatchMediaUploadPageModule)
  },
  {
    path: 'visitors-open-match',
    loadChildren: () => import('./visitors-open-match/visitors-open-match.module').then( m => m.VisitorsOpenMatchPageModule)
  },
  {
    path: 'personal-match-revealed',
    loadChildren: () => import('./personal-match-revealed/personal-match-revealed.module').then( m => m.PersonalMatchRevealedPageModule)
  },
  {
    path: 'besties-comment',
    loadChildren: () => import('./besties-comment/besties-comment.module').then( m => m.BestiesCommentPageModule)
  },
  {
    path: 'add-reject-besties',
    loadChildren: () => import('./add-reject-besties/add-reject-besties.module').then( m => m.AddRejectBestiesPageModule)
  },
  {
    path: 'squad-list-invitation',
    loadChildren: () => import('./squad-list-invitation/squad-list-invitation.module').then( m => m.SquadListInvitationPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
