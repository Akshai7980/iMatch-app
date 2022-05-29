import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { PopoverController } from '@ionic/angular';
import { NavParams, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-visitors-ongoing-match',
  templateUrl: './visitors-ongoing-match.page.html',
  styleUrls: ['./visitors-ongoing-match.page.scss'],
})
export class VisitorsOngoingMatchPage implements OnInit {

  userDetails: any;
  ongoingDetails: any = [];
  showPersonalScores: boolean = false;
  hideValue: boolean = true;

  RemainingTime: number;
  interval: any;
  HoursAgo: number;
  userArray: any;
  ongoingDetailsImage: any = [];
  ongoingDetailsVideo: any = [];
  ongoingDetailsAudio: any = [];
  ongoingDetailsText: any = [];
  ongoingDetailsLink: any = [];
  @ViewChild('slides', {static: true}) slides: IonSlides;
  personalMatchSlideIndex: any;
  RemainingDuration : number;

  constructor(

    public storageservice: StorageService,
    private common: CommonService,    
    public popoverController: PopoverController,

  ) {

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.userArray = resp;
      this.personalMatchSlideIndex = this.userArray.personalMatchSlideIndex;
      console.log('userArray:',this.userArray);
  });

   }

  ngOnInit() {
  }


  ionViewWillEnter(){

    this.common.presentLoading();
    this.ongoingDetails = [];
    console.log('Entered into Visitors Ongoing Contest page');

    if (this.userArray.userStatus!='VISITOR') {

      this.slides.slideTo(this.personalMatchSlideIndex);

      let params = {
        userid : this.userArray.userid,
        visitorid : this.userArray.visitor_id
      }

      console.log('params:',params);
      this.common.postMethod('OngoingMatch',params).then((res:any) => {
        console.log('res:',res);

        if (res.status == true) {

          this.ongoingDetailsAudio = res.details.audio;
          console.log('ongoingDetailsAudio:', this.ongoingDetailsAudio);
  
          this.ongoingDetailsImage = res.details.image;
          console.log('ongoingDetailsImage:', this.ongoingDetailsImage);
  
          this.ongoingDetailsLink = res.details.link;
          console.log('ongoingDetailsLink:', this.ongoingDetailsLink);
  
          this.ongoingDetailsText = res.details.text;
          console.log('ongoingDetailsText:', this.ongoingDetailsText);
  
          this.ongoingDetailsVideo = res.details.video;
          console.log('ongoingDetailsVideo:', this.ongoingDetailsVideo);

          if (this.ongoingDetailsAudio.length!==0) {
            for (let i=0; i < this.ongoingDetailsAudio.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsAudio[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          } 
          if (this.ongoingDetailsImage.length!==0) {
            for (let i=0; i < this.ongoingDetailsImage.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsImage[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          }
          if (this.ongoingDetailsLink.length!==0) {
            for (let i=0; i < this.ongoingDetailsLink.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsLink[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          }
          if (this.ongoingDetailsText.length!==0) {
            for (let i=0; i < this.ongoingDetailsText.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsText[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          }
          if (this.ongoingDetailsVideo.length!==0) {
            for (let i=0; i < this.ongoingDetailsVideo.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsVideo[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          } 

          if (this.ongoingDetails?.length==0 || this.ongoingDetails===undefined) {

            clearInterval(this.interval);
            
          } else {
     
          //  this.interval = setInterval(() => {
          //    this.Timer();
          //    this.ongoingDetails;
          //    console.log('ongoingDetails:',this.ongoingDetails);
          //  }, 1000);
     
          }

        } else {
          // this.ongoingDetails = res.details;
          console.log('ongoingDetails:', this.ongoingDetails);
          console.log('currently you are having no ongoing matches');

        }

        // console.log('ongoingDetails:', this.ongoingDetails);
      }, err => {
       console.log('Error:',err);
       // this.common.presentLoading();
       // this.common.presentToast(' A Network Error Occured... Please Try Once Again');
      });
      
    } else if (this.userArray.userStatus==='VISITOR') {

      this.slides.slideTo(this.personalMatchSlideIndex);

      let params = {
        userid : '',
        visitorid : this.userArray.visitor_id,
      }
      console.log('params:',params);
      this.common.postMethod('OngoingMatch',params).then((res:any) => {
        console.log('res:',res);

        if (res.status == true) {

          this.ongoingDetailsAudio = res.details.audio;
          console.log('ongoingDetailsAudio:', this.ongoingDetailsAudio);

          this.ongoingDetailsImage = res.details.image;
          console.log('ongoingDetailsImage:', this.ongoingDetailsImage);

          this.ongoingDetailsLink = res.details.link;
          console.log('ongoingDetailsLink:', this.ongoingDetailsLink);

          this.ongoingDetailsText = res.details.text;
          console.log('ongoingDetailsText:', this.ongoingDetailsText);

          this.ongoingDetailsVideo = res.details.video;
          console.log('ongoingDetailsVideo:', this.ongoingDetailsVideo);

  
          if (this.ongoingDetailsAudio.length!=0) {
            for (let i=0; i < this.ongoingDetailsAudio.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsAudio[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          }
           if (this.ongoingDetailsImage.length!=0) {
            for (let i=0; i < this.ongoingDetailsImage.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsImage[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          } 
           if (this.ongoingDetailsLink.length!=0) {
            for (let i=0; i < this.ongoingDetailsLink.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsLink[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          }
           if (this.ongoingDetailsText.length!=0) {
            for (let i=0; i < this.ongoingDetailsText.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsText[i]);
            }
            console.log('ongoingDetails:', this.ongoingDetails);
          }
           if (this.ongoingDetailsVideo.length!=0) {
            for (let i=0; i < this.ongoingDetailsVideo.length; i++) {
              this.ongoingDetails.push(this.ongoingDetailsVideo[i]);
              // this.slides.slideTo(this.personalMatchSlideIndex);

            }
            console.log('ongoingDetails:', this.ongoingDetails);
            // this.slides.slideTo(this.personalMatchSlideIndex);

          } 

          if (this.ongoingDetails?.length==0 || this.ongoingDetails===undefined) {

            clearInterval(this.interval);
            
          } else {
     
          //  this.interval = setInterval(() => {
          //    this.Timer();
          //    this.ongoingDetails;
          //    console.log('ongoingDetails:',this.ongoingDetails);

          //  }, 1000);
     
          }

        } else {
          // this.ongoingDetails = res.details.image;
          console.log('ongoingDetails:', this.ongoingDetails);
          console.log('currently you are having no ongoing matches');
        }


        // this.ongoingDetails = res.details.image;
        // console.log('ongoingDetails:', this.ongoingDetails);
      }, err => {
        console.log('Error:',err);
      });
    }
 
   }


    Timer() {
      console.log('Timer is running');

      if (this.ongoingDetails!==undefined || this.ongoingDetails.length!=0) {

        for (let i=0; i<this.ongoingDetails.length; i++) {
          console.log('Match End Time:',this.ongoingDetails[i]?.match_end);
          console.log('Match Start Time:',this.ongoingDetails[i]?.match_start);
          console.log('Time Duration:',this.ongoingDetails[i]?.time_duration);

          let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          console.log('countDownDate:',StartTime);
      
          let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          console.log('now:',EndTime);

          let LeftTime = new Date(this.ongoingDetails[i]?.remaining_time).getTime();
          console.log('now:',LeftTime);

          let CurrentTime = new Date().getTime();
          console.log('CurrentTime:',CurrentTime);

          var difference = LeftTime - CurrentTime;

          var daysDifference = Math.floor(difference/1000/60/60/24);
          difference -= daysDifference*1000*60*60*24
      
          var hoursDifference = Math.floor(difference/1000/60/60);
          difference -= hoursDifference*1000*60*60
      
          var minutesDifference = Math.floor(difference/1000/60);
          difference -= minutesDifference*1000*60
      
          var secondsDifference = Math.floor(difference/1000);
      
          console.log('difference = ' + 
            daysDifference + ' day/s ' + 
            hoursDifference + ' hour/s ' + 
            minutesDifference + ' minute/s ' + 
            secondsDifference + ' second/s ');

          // var difference = this.ongoingDetails[i]?.match_end - this.ongoingDetails[i]?.match_start;
          // var daysDifference = Math.floor(difference/1000/60/60/24);
          // this.RemainingTime = difference;

          // return daysDifference;

          // if (this.ongoingDetails[i]?.time_duration ==='1 hour') {

          //   let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          //   console.log('countDownDate:',StartTime);
      
          //   let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          //   console.log('now:',EndTime);

          //   if (StartTime>EndTime) {

          //     let RemainingDuration = StartTime - EndTime;
          //     this.RemainingTime = RemainingDuration;
          //     console.log('TotalRemaining:',RemainingDuration);
          //   } else {

          //     let RemainingDuration = EndTime - StartTime;
          //     this.RemainingTime = RemainingDuration;
          //     console.log('TotalRemaining:',RemainingDuration);
          //   }

          // } else if (this.ongoingDetails[i]?.time_duration ==='2 hour') {

          //   let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          //   console.log('countDownDate:',StartTime);
      
          //   let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          //   console.log('now:',EndTime);

          //   if (StartTime>EndTime) {

          //     let RemainingDuration = StartTime - EndTime;
          //     this.RemainingTime = RemainingDuration;
          //     console.log('TotalRemaining:',RemainingDuration);
          //   } else {

          //     let RemainingDuration = EndTime - StartTime;
          //     this.RemainingTime = RemainingDuration;
          //     console.log('TotalRemaining:',RemainingDuration);
          //   }

          // } else if (this.ongoingDetails[i]?.time_duration ==='3 hour') {

          //   let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          //   console.log('countDownDate:',StartTime);
      
          //   let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          //   console.log('now:',EndTime);

          //   if (StartTime>EndTime) {

          //     let RemainingDuration = StartTime - EndTime;
          //     this.RemainingTime = RemainingDuration;

          //     console.log('TotalRemaining:',RemainingDuration);
          //   } else {

          //     let RemainingDuration = EndTime - StartTime;
          //     this.RemainingTime = RemainingDuration;

          //     console.log('TotalRemaining:',RemainingDuration);
          //   }

          // } else if (this.ongoingDetails[i]?.time_duration ==='4 hour') {

          //   let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          //   console.log('countDownDate:',StartTime);
      
          //   let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          //   console.log('now:',EndTime);

          //   if (StartTime>EndTime) {

          //     let RemainingDuration = StartTime - EndTime;
          //     this.RemainingTime = RemainingDuration;

          //     console.log('TotalRemaining:',RemainingDuration);
          //   } else {

          //     let RemainingDuration = EndTime - StartTime;
          //     this.RemainingTime = RemainingDuration;

          //     console.log('TotalRemaining:',RemainingDuration);
          //   }

          // } else if (this.ongoingDetails[i]?.time_duration ==='5 hour') {
          //   console.log('Five hours match');

          //   let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          //   console.log('countDownDate:',StartTime);
      
          //   let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          //   console.log('now:',EndTime);

          //     let RemainingDuration = EndTime - StartTime;
          //     this.RemainingTime = RemainingDuration;
          //     console.log('TotalRemaining:',RemainingDuration);

            // if (StartTime>EndTime) {

            //   let RemainingDuration = StartTime - EndTime;
            //   this.RemainingTime = RemainingDuration;

            //   console.log('TotalRemaining:',RemainingDuration);
            // } else {

            //   let RemainingDuration = EndTime - StartTime;
            //   this.RemainingTime = RemainingDuration;

            //   console.log('TotalRemaining:',RemainingDuration);
            // }

          }
  
          // let StartTime = new Date(this.ongoingDetails[i]?.match_start).getTime();
          // console.log('countDownDate:',StartTime);
    
          // let EndTime = new Date(this.ongoingDetails[i]?.match_end).getTime();
          // console.log('now:',EndTime);
  
          // let CurrentTime = new Date().getTime();
          // console.log('CurrentTime:',CurrentTime);
    
          // let TotalRemaining = EndTime - StartTime ;
          // this.RemainingTime = TotalRemaining;
          // console.log('TotalRemaining:', TotalRemaining, 'RemainingTime:', this.RemainingTime);
    
          // let LeftTime = TotalRemaining - CurrentTime;
          // this.RemainingTime = LeftTime;
          // console.log('left:',LeftTime ,'RemainingTime:',this.RemainingTime);
    
          // let TimeAgo = CurrentTime - StartTime;
          // console.log('TimeAgo:',TimeAgo);
          // this.HoursAgo = TimeAgo;
          // console.log('HoursAgo:',this.HoursAgo);
      //   }
      }
    }

    toLikeForReceiver(e, details, i) {
      console.log('Receiver side post Liked:',i);
      // i = this.personalMatchSlideIndex;
      this.slides.slideTo(this.personalMatchSlideIndex);

      let params = {
        userid : this.userDetails.userid,
        matchid : details.match_id,
        contestentid : details.receiverid,
        status : 'like',
                }
      console.log('details:',details);
      console.log('params:',params);
      this.common.postMethod('Like',params).then((res:any) => {
        console.log('res:',res);
        if (res.status == true) {
          // this.slides.slideTo(this.personalMatchSlideIndex);
          this.ionViewWillEnter();
        } else {
          this.common.presentToast('You had already liked this Ongoing Match');
        }
      }, err => {
        console.log('Error:',err);
        this.common.presentLoading();
        this.ionViewWillEnter();
        // this.common.presentToast(' A Network Error Occured... Please Try Once Again');
      });
     }

     toLikeForSender(e, details, i) {
      console.log('Sender side post liked:',i);
      // i = this.personalMatchSlideIndex;
      this.slides.slideTo(this.personalMatchSlideIndex);

      let params = {
        userid : this.userDetails.userid,
        matchid : details.match_id,
        contestentid : details.senderid,
       status : 'like'
      }
      console.log('details:',details);
      console.log('params:',params);
      this.common.postMethod('Like',params).then((res:any) => {
        console.log('res:',res);
        if (res.status == true) {
          // this.slides.slideTo(this.personalMatchSlideIndex);
         this.ionViewWillEnter();
       } else {
         this.common.presentToast('You had already liked this Ongoing Match');
       }
      }, err => {
       console.log('Error:',err);
       this.common.presentLoading();
       this.ionViewWillEnter();
      //  this.common.presentToast(' A Network Error Occured... Please Try Once Again');
      });
    }

    openComments(e,details) {
      console.log('match details:',details);
      // this.common.router.navigate(['/comments'], {queryParams : details});
      details.matchType = 'ONGOING';
      this.common.navCtrl.navigateForward(['comments'], {queryParams: details});
    }

    toshowPersonalScores(e,details) {
      console.log('details:',details);
      this.showPersonalScores = !this.showPersonalScores;
    }

    toHidePopover () {
      console.log('To Hide Popover Clicked');
      this.showPersonalScores = false;
    }

    gotoImageIcon(icon) {
      console.log('Icon:',icon);

      if (this.userArray.userStatus==='VISITOR') {

        if (icon == 'image') {

          this.common.presentLoading();
          let params = {
            userid : '',
            visitorid : this.userArray.visitor_id
          }
          console.log('params:',params);
          this.common.postMethod('OngoingMatch',params).then((res:any) => {
            console.log('res:',res);
  
            if (res.details.image.length!=0) {
              this.ongoingDetails = res.details.image;
              this.common.presentToast('Ongoing Image Match is Successfully Displayed');
              // this.slides.slideTo(this.personalMatchSlideIndex);
              console.log('OngoingMatch:',this.ongoingDetails);
  
            } else  {
              this.common.presentToast('Currently You Are Having No Ongoing Image Matches');  
            }
  
          }, err=> {
            console.log('Error:',err);
          });
  
        } else if (icon == 'video') {
            this.common.presentLoading();
  
          let params = {
            userid : '',
            visitorid : this.userArray.visitor_id
          }
          console.log('params:',params);
          this.common.postMethod('OngoingMatch',params).then((res:any) => {
            console.log('res:',res);
            if (res.details.video.length!=0) {
              this.ongoingDetails = res.details.video;
              this.common.presentToast('Ongoing Video Match is Successfully Displayed');
              // this.slides.slideTo(this.personalMatchSlideIndex);
              console.log('OngoingMatch:',this.ongoingDetails);
  
            } else  {
              this.common.presentToast('Currently You Are Having No Ongoing Video Matches');  
            }
          }, err=> {
            console.log('Error:',err);
          });
  
        } else if (icon == 'audio') {
            this.common.presentLoading();
  
          let params = {
            userid : '',
            visitorid : this.userArray.visitor_id
          }
          console.log('params:',params);
          this.common.postMethod('OngoingMatch',params).then((res:any) => {
            console.log('res:',res);
  
            if (res.details.audio.length!=0) {
              this.ongoingDetails = res.details.audio;
              this.common.presentToast('Ongoing Audio Match is Successfully Displayed');
              // this.slides.slideTo(this.personalMatchSlideIndex);
              console.log('OngoingMatch:',this.ongoingDetails);
  
            } else  {
              this.common.presentToast('Currently You Are Having No Ongoing Audio Matches');  
            }
          }, err=> {
            console.log('Error:',err);
          });
  
        } else if (icon == 'attachment') {
            this.common.presentLoading();
  
          let params = {
            userid : '',
            visitorid : this.userArray.visitor_id
          }
          console.log('params:',params);
          this.common.postMethod('OngoingMatch',params).then((res:any) => {
            console.log('res:',res);
  
            if (res.details.text.length!=0) {
              this.ongoingDetails = res.details.text;
              this.common.presentToast('Ongoing Text Match is Successfully Displayed');
              // this.slides.slideTo(this.personalMatchSlideIndex);
              console.log('OngoingMatch:',this.ongoingDetails);
  
            } else  {
              this.common.presentToast('Currently You Are Having No Ongoing Text Matches');  
            }
          }, err=> {
            console.log('Error:',err);
          });
  
        } else if (icon == 'link') {
            this.common.presentLoading();
          let params = {
            userid : '',
            visitorid : this.userArray.visitor_id
          }
          console.log('params:',params);
          this.common.postMethod('OngoingMatch',params).then((res:any) => {
            console.log('res:',res);
  
            if (res.details.link.length!=0) {
              this.ongoingDetails = res.details.link;
              this.common.presentToast('Ongoing Link Match is Successfully Displayed');
              // this.slides.slideTo(this.personalMatchSlideIndex);
              console.log('OngoingMatch:',this.ongoingDetails);
  
            } else  {
              this.common.presentToast('Currently You Are Having No Ongoing Link Matches');  
            }
          }, err=> {
            console.log('Error:',err);
          });
  
        }
      } else {

      if (icon == 'image') {

        this.common.presentLoading();
        let params = {
          userid : this.userArray.userid,
          visitorid : this.userArray.visitor_id
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.image.length!=0) {
            this.ongoingDetails = res.details.image;
            this.common.presentToast('Ongoing Image Match is Successfully Displayed');
            // this.slides.slideTo(this.personalMatchSlideIndex);
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Image Matches');
          }
        }, err=> {
          console.log('Error:',err);
        });

      } else if (icon == 'video') {

        this.common.presentLoading();

        let params = {
          userid : this.userArray.userid,
          visitorid : this.userArray.visitor_id
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);
          if (res.details.video.length!=0) {
            this.ongoingDetails = res.details.video;
            this.common.presentToast('Ongoing Video Match is Successfully Displayed');
            // this.slides.slideTo(this.personalMatchSlideIndex);
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Video Matches');
          }
        }, err=> {
          console.log('Error:',err);
        });

      } else if (icon == 'audio') {

        this.common.presentLoading();

        let params = {
          userid : this.userArray.userid,
          visitorid : this.userArray.visitor_id
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.audio.length!=0) {
            this.ongoingDetails = res.details.audio;
            this.common.presentToast('Ongoing Audio Match is Successfully Displayed');
            // this.slides.slideTo(this.personalMatchSlideIndex);
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Audio Matches');
          }
        }, err=> {
          console.log('Error:',err);
        });

      } else if (icon == 'attachment') {

        this.common.presentLoading();

        let params = {
          userid : this.userArray.userid,
          visitorid : this.userArray.visitor_id
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.text.length!=0) {
            this.ongoingDetails = res.details.text;
            this.common.presentToast('Ongoing Text Match is Successfully Displayed');
            // this.slides.slideTo(this.personalMatchSlideIndex);
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Text Matches');
          }
        }, err=> {
          console.log('Error:',err);
        });

      } else if (icon == 'link') {

        this.common.presentLoading();

        let params = {
          userid : this.userArray.userid,
          visitorid : this.userArray.visitor_id
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.link.length!=0) {
            this.ongoingDetails = res.details.link;
            this.common.presentToast('Ongoing Link Match is Successfully Displayed');
            // this.slides.slideTo(this.personalMatchSlideIndex);
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Link Matches');
          }

          // this.ongoingDetails = res.details.link;
          // if (this.ongoingDetails===undefined) {
          //   this.common.presentToast('Currently You Are Having No Ongoing Matches');
          // } else {
          //   this.common.presentToast('Ongoing Link Match is Successfully Displayed');
          // }
          // console.log('OngoingMatch:',this.ongoingDetails);
          // this.common.hideLoader();
        }, err=> {
          // this.common.hideLoader();
          console.log('Error:',err);
        });

      }
    }
    }

}
