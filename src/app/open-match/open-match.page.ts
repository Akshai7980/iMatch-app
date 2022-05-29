import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { IonSlides, PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-open-match',
  templateUrl: './open-match.page.html',
  styleUrls: ['./open-match.page.scss'],
})
export class OpenMatchPage implements OnInit {

  userDetails: any = [];
  openMatches: any = [];
  @ViewChild('slides', {static: true}) slides: IonSlides;
  personalMatchSlideIndex: any;
  OpenMatchImage: any = [];
  OpenMatchAudio: any = [];
  OpenMatchVideo: any = [];
  OpenMatchLink: any = [];
  OpenMatchText: any = [];

  constructor(
    public storageservice: StorageService,
    public popoverController: PopoverController,
    private common: CommonService, 
  ) { 

    this.common.route.queryParams.subscribe((resp:any) => {
      this.userDetails = resp;
      this.personalMatchSlideIndex = this.userDetails.personalMatchSlideIndex;
      console.log('userArray:',this.userDetails);
    });

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered into Open Match page');
 
     this.storageservice.storage.get('userDetails').then((val) => {
       this.userDetails = val ;
 
       if ( this.userDetails.userid != '' ) {
 
         let params = {
           userid : this.userDetails.userid
         }
 
         console.log('params:',params);
         this.common.postMethod('OpenMatch',params).then((res:any) => {
           console.log('openMatches:',res);
          //  this.openMatches = res.details.image;

           this.OpenMatchImage = res.details.image;
           this.OpenMatchAudio = res.details.audio;
           this.OpenMatchVideo = res.details.video;
           this.OpenMatchLink = res.details.link;
           this.OpenMatchText = res.details.text;

           this.slides.slideTo(this.personalMatchSlideIndex);
           console.log('openMatches:', this.openMatches);

           if (this.OpenMatchAudio.length!==0) {
            for (let i=0; i < this.OpenMatchAudio.length; i++) {
              this.openMatches.push(this.OpenMatchAudio[i]);
            }
            console.log('OpenMatch:', this.openMatches);
          } 

          if (this.OpenMatchImage.length!==0) {
            for (let i=0; i < this.OpenMatchImage.length; i++) {
              this.openMatches.push(this.OpenMatchImage[i]);
            }
            console.log('OpenMatch:', this.openMatches);
          } 

          if (this.OpenMatchLink.length!==0) {
            for (let i=0; i < this.OpenMatchLink.length; i++) {
              this.openMatches.push(this.OpenMatchLink[i]);
            }
            console.log('OpenMatch:', this.openMatches);
          } 

          if (this.OpenMatchText.length!==0) {
            for (let i=0; i < this.OpenMatchText.length; i++) {
              this.openMatches.push(this.OpenMatchText[i]);
            }
            console.log('OpenMatch:', this.openMatches);
          } 

          if (this.OpenMatchVideo.length!==0) {
            for (let i=0; i < this.OpenMatchVideo.length; i++) {
              this.openMatches.push(this.OpenMatchVideo[i]);
            }
            console.log('OpenMatch:', this.openMatches);
          } 
         });
       }
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
      userid : this.userDetails.userid,
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
      userid : this.userDetails.userid,
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

      // await this.common.showLoader();

      let params = {
        userid : this.userDetails.userid
      }
      console.log('params:',params);
      this.common.postMethod('OpenMatch',params).then((res:any) => {
        console.log('res:',res);
        this.openMatches = res.details.image;
        if (this.openMatches.length===0) {
          this.common.presentToast('You are having no image Open Matches');
        } else {
          this.common.presentToast('You are having '+ this.openMatches.length + ' image Open Matches');
        }
        console.log('openMatches:',this.openMatches);
      }, err => {
        console.log('err:',err);
      });

    // this.common.hideLoader();

     } else if (icon === 'video') {

      // this.common.showLoader();

      let params = {
        userid : this.userDetails.userid
      }
      console.log('params:',params);
      this.common.postMethod('OpenMatch',params).then((res:any) => {
        console.log('res:',res);
        this.openMatches = res.details.video;
        if (this.openMatches.length===0) {
          this.common.presentToast('You are having no video Open Matches');
        } else {
          this.common.presentToast('You are having '+ this.openMatches.length + ' video Open Matches');
        }
        console.log('openMatches:',this.openMatches);
      }, err => {
        console.log('err:',err);
      });

      // this.common.hideLoader();

     } else if (icon === 'audio') {

      // this.common.showLoader();

      let params = {
        userid : this.userDetails.userid
      }
      console.log('params:',params);
      this.common.postMethod('OpenMatch',params).then((res:any) => {
        console.log('res:',res);
        this.openMatches = res.details.audio;
        if (this.openMatches.length===0) {
          this.common.presentToast('You are having no audio Open Matches');
        } else {
          this.common.presentToast('You are having '+ this.openMatches.length + ' audio Open Matches');
        }
        console.log('openMatches:',this.openMatches);
      }, err => {
        console.log('err:',err);
      });

      // this.common.hideLoader();

     } else if (icon === 'attachment') {

      // this.common.showLoader();

      let params = {
        userid : this.userDetails.userid
      }
      console.log('params:',params);
      this.common.postMethod('OpenMatch',params).then((res:any) => {
        console.log('res:',res);
        this.openMatches = res.details.text;
        if (this.openMatches.length===0) {
          this.common.presentToast('You are having no text Open Matches');
        } else {
          this.common.presentToast('You are having '+ this.openMatches.length + ' text Open Matches');
        }
        console.log('openMatches:',this.openMatches);
      }, err => {
        console.log('err:',err);
      });

      // this.common.hideLoader();

     } else if (icon === 'link') {

      // this.common.showLoader();

      let params = {
        userid : this.userDetails.userid
      }
      console.log('params:',params);
      this.common.postMethod('OpenMatch',params).then((res:any) => {
        console.log('res:',res);
        this.openMatches = res.details.link;
        if (this.openMatches.length===0) {
          this.common.presentToast('You are having no link Open Matches');
        } else {
          this.common.presentToast('You are having '+ this.openMatches.length + ' link Open Matches');
        }
        console.log('openMatches:',this.openMatches);
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
