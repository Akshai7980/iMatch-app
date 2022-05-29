import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { IonSlides, PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-visitors-open-match',
  templateUrl: './visitors-open-match.page.html',
  styleUrls: ['./visitors-open-match.page.scss'],
})
export class VisitorsOpenMatchPage implements OnInit {

  UserInfo: any = [];
  openMatches: any = [];
  @ViewChild('slides', {static: true}) slides: IonSlides;
  personalMatchSlideIndex: any;

  constructor(
    public popoverController: PopoverController,
    private common: CommonService, 
  ) { 

    this.common.route.queryParams.subscribe((resp:any) => {
      this.UserInfo = resp;
      this.personalMatchSlideIndex = this.UserInfo.personalMatchSlideIndex;
      console.log('UserInfo:',this.UserInfo);
    });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered into Open Match page');

         let params = {
           userid : this.UserInfo.userid
         }

         this.common.showLoader();

         console.log('params:',params);
         this.common.postMethod('OpenMatch',params).then((res:any) => {
           console.log('res:',res);
          //  this.slides.slideTo(this.personalMatchSlideIndex);
           this.openMatches = res.details.images;
           this.slides.slideTo(this.personalMatchSlideIndex);
           console.log('openMatches:', this.openMatches);
          //  this.slides.slideTo(this.personalMatchSlideIndex);
           this.common.hideLoader();

         }, err => {
           console.log('Error:',err);
         });
   }

   gotoOpenMatchComments(event,match) {
    console.log('Comment View Page Clicked');
    console.log('match:',match);
    this.common.navCtrl.navigateForward(['/comments'], {queryParams: match});
   }

   toLikeOpenMatch(event,match) {
    console.log('Like Open Match Button Clicked');
    let params = {
      userid : this.UserInfo.userid,
      matchid : match.match_id,
      contestentid : '',
      status : 'like'
    }
    console.log('params:',params);
    console.log('match:',match);
    this.common.postMethod('Like',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });
   }

   toDisLikeOpenMatch(event,match) {
    console.log('Dislike Open Match Button Clicked');
    let params = {
      userid : this.UserInfo.userid,
      matchid : match.match_id,
      contestentid : '',
      status : 'dislike'
    }
    console.log('params:',params);
    console.log('match:',match);
    this.common.postMethod('Like',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });
   }

   toCommentOpenMatch(event,match) {
     console.log('Comment Open Match Button Clicked');
     this.common.navCtrl.navigateForward(['/open-match-comments'], {queryParams: match});
   }

   GetIconSearch(icon) {
    console.log('Icon clicked:',icon);
    if (icon === 'image') {

     this.common.showLoader();

     let params = {
       userid : this.UserInfo.userid
     }
     console.log('params:',params);
     this.common.postMethod('OpenMatch',params).then((res:any) => {
       console.log('res:',res);
       this.openMatches = res.details;
     }, err => {
       console.log('err:',err);
     });

     this.common.hideLoader();

    } else if (icon === 'video') {

     // this.common.showLoader();

     let params = {
       userid : this.UserInfo.userid
     }
     console.log('params:',params);
     this.common.postMethod('OpenMatch',params).then((res:any) => {
       console.log('res:',res);
       this.openMatches = res.details;
     }, err => {
       console.log('err:',err);
     });

     // this.common.hideLoader();

    } else if (icon === 'audio') {

     // this.common.showLoader();

     let params = {
       userid : this.UserInfo.userid
     }
     console.log('params:',params);
     this.common.postMethod('OpenMatch',params).then((res:any) => {
       console.log('res:',res);
       this.openMatches = res.details;
     }, err => {
       console.log('err:',err);
     });

     // this.common.hideLoader();

    } else if (icon === 'attachment') {

     // this.common.showLoader();

     let params = {
       userid : this.UserInfo.userid
     }
     console.log('params:',params);
     this.common.postMethod('OpenMatch',params).then((res:any) => {
       console.log('res:',res);
       this.openMatches = res.details;
     }, err => {
       console.log('err:',err);
     });

     // this.common.hideLoader();

    } else if (icon === 'link') {

     // this.common.showLoader();

     let params = {
       userid : this.UserInfo.userid
     }
     console.log('params:',params);
     this.common.postMethod('OpenMatch',params).then((res:any) => {
       console.log('res:',res);
       this.openMatches = res.details;
     }, err => {
       console.log('err:',err);
     });

     // this.common.hideLoader();

    }
  }

   async toShowMatchHistory(ev:any ,match) {
     console.log('Show Match History Button Clicked');

     const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      componentProps:{key:match},
      translucent: true,
      backdropDismiss: true,
      animated: false
    });
    return await popover.present();

   }

}

@Component({
  template: `
        <div style=" text-align: center; ">
          <h4 style=" font-weight: 600; "> Match History </h4>
          <div style=" border: 3px solid grey; padding: 15px; margin: 15px; font-size: 14px;">
            <p>Match Date : <span> {{Match.match_start | date}} </span> </p>
            <p>Match Start Time : <span> {{Match.match_start | date:'shortTime'}} </span> </p>
            <p>Match End Time : <span> {{Match.match_end | date:'shortTime'}} </span> </p>
            <p>Total Hours : <span> {{Match.time_duration}} </span> </p>
          </div>
        </div>
   `
})

export class PopoverComponent {

 Match: any  = [];

 constructor(
  public popoverController: PopoverController,
   private common: CommonService,
   public navParams: NavParams,
   ) {
     console.log(this.navParams.get('key'));
    this.Match = this.navParams.get('key');
     console.log('users in popover:',this.Match);
   }

   ionViewWillEnter(){
     console.log('ionViewWillEnter:',this.Match);
     }

    //  toClose() {
    //    this.common.popoverController.dismiss();
    //  }
    }

