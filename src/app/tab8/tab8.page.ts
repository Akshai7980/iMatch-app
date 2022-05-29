import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {

  slideOpts = {
    effect: 'flip',
    autoplay: {
      delay: 3000
    }
  };

  @ViewChild('mySlider')  slides: IonSlides;
  buttonName = "NEXT"
  selectedSlide: any;

  userDetails: any = [];
  ongoingDetails: any = [];
  allUsers: any = [];
  showIcons: boolean = false; 
  SlideFirst: any;
  SlideSecond: any;

  SlideThird: any;
  SlideFourth: any;
  SlideFifth: any;
  SlideSixth: any;
  SlideSeventh: any;
  SlideEighth: any;
  SlideNinth: any;
  SlideTenth: any;
  ImageIcons: boolean;
  RecommendedForYou: any;
  HashTagOptions: { name: any; image: any; }[];
  ongoingDetailsAudio: any = [];
  ongoingDetailsImage: any = [];
  ongoingDetailsLink: any = [];
  ongoingDetailsText: any = [];
  ongoingDetailsVideo: any = [];
  // userArray: any;

  constructor(
    public storageservice: StorageService,
    private common: CommonService
    ) {

      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });        
     }

     ionSlideChanges(slides) {
      this.selectedSlide = slides;
      console.log('slides:',slides);
      console.log('selectedSlide:',this.selectedSlide);

      // slides.getActiveIndex().then(
      //   (slidesIndex) => {
      //     if (slidesIndex == 2) {
      //       this.buttonName = "GET STARTED";
      //     } else {
      //       this.buttonName = "NEXT";
      //     }
      //   });
     }

     nextSlide() {
      console.log('Next Button Clicked');
      // this.slides.slideNext();
     }

     ionViewWillEnter() {
       console.log('Entered Into Home Page');
       this.ongoingDetails = [];
      // this.storageservice.storage.get('userDetails').then((val) => {
      //   this.userDetails = val;

        // if (this.userDetails.userid != '') {
          let params = {
            userid : ''
          }
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
              } else {
                  console.log('ongoingDetails:', this.ongoingDetails);
                  console.log('currently you are having no ongoing matches');
           
                }
            }
          });
          this.common.postMethod('Recommended_for_you',params).then((res:any) => {
            console.log('res:',res);
            this.RecommendedForYou = res.details;
            // this.SlideSecond = res.details[1];
            // this.SlideThird = res.details[2];
            // this.SlideFourth = res.details[3];
            // this.SlideFifth = res.details[4];
            // this.SlideSixth = res.details[5];
            // this.SlideSeventh = res.details[6];
            // this.SlideEighth = res.details[7];
            // this.SlideNinth = res.details[8];
            // this.SlideTenth = res.details[9];
          });
        // }
      // });

      this.slideOpts = {
        effect: 'flip',
        autoplay: {
          delay: 2000
        }
      };

     }

    ngOnInit() {

      this.HashTagOptions = [
        {
          name : 'Funny',
          image : '../../assets/icon/funny.png'
        },
        {
          name : 'Art & Entertainment',
          image : '../../assets/icon/arts.png'
        },
        {
          name : 'Beauty & Fashion',
          image : '../../assets/icon/beauty.png'
        },
        {
          name : 'Health & Food',
          image : '../../assets/icon/health.png'
        },
        {
          name : 'Education',
          image : '../../assets/icon/schol.png'
        },
        {
          name : 'Events and others',
          image : '../../assets/icon/events.png'
        },
        {
          name : 'Home and decors',
          image : '../../assets/icon/decor.png'
        },
        {
          name : 'Luxuries',
          image : '../../assets/icon/dimond.png'
        },
        {
          name : 'Business',
          image : '../../assets/icon/business.png'
        },
        {
          name : 'Charity',
          image : '../../assets/icon/charity.png'
        },
        {
          name : 'iMatch top 100',
          image : '../../assets/icon/top100.png'
        },
        {
          name : 'News',
          image : '../../assets/icon/news.png'
        },
        {
          name : 'Blog',
          image : '../../assets/icon/blog.png'
        },
      ]

      console.log('HashTagOptions:',this.HashTagOptions);

    }

    goToPage(page: string) {
      const p = 'tabs/tab8/' + page;
      this.common.router.navigate([p]);
    }

    goToOngoingContestPage(e, details, i: number, userType) {
      // this.common.router.navigate(['/tabs/tab2']);
      // this.userArray = this.userDetails;
      this.userDetails.userStatus = userType;
      this.userDetails.visitor_id = this.userDetails.userid;
      this.userDetails.personalMatchSlideIndex = i;
      this.common.navCtrl.navigateForward(['visitors-ongoing-match'] , {queryParams: this.userDetails});
    }

    toShowImageIcons() {
      console.log('Show Images Icons Button Clicked');
      this.ImageIcons = true;
    }

    toHideImageIcons() {
      console.log('Show Images Icons Button Clicked');
      this.ImageIcons = false;
    }

    gotoSearchUsers() {
      this.common.navCtrl.navigateForward(['/search-users'], {queryParams: this.userDetails});
    }

    toOpenIconsPanel() {
      console.log('To Open Icons Panel Clicked');
      this.showIcons = !this.showIcons;
      console.log('showIcons:',this.showIcons);
    }

    gotoProfile() {
      this.common.router.navigate(['/tabs/tab7']);
    }

    gotoImageIcon(icon) {
      console.log('icon:',icon);
      if (icon == 'image') {

        this.common.presentLoading();
        let params = {
          userid : '',
          visitorid : this.userDetails.userid
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.image.length!=0) {
            this.ongoingDetails = res.details.image;
            this.common.presentToast('Ongoing Image Match is Successfully Displayed');
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
          visitorid : this.userDetails.userid
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);
          if (res.details.video.length!=0) {
            this.ongoingDetails = res.details.video;
            this.common.presentToast('Ongoing Video Match is Successfully Displayed');
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Video Matches');
          }
          this.common.hideLoader();
        }, err=> {
          this.common.hideLoader();
          console.log('Error:',err);
        });
      } else if (icon == 'audio') {

        // this.common.showLoader();
        this.common.presentLoading();
        let params = {
          userid : '',
          visitorid : this.userDetails.userid
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.audio.length!=0) {
            this.ongoingDetails = res.details.audio;
            this.common.presentToast('Ongoing Audio Match is Successfully Displayed');
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
          visitorid : this.userDetails.userid
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.text.length!=0) {
            this.ongoingDetails = res.details.text;
            this.common.presentToast('Ongoing Text Match is Successfully Displayed');
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
          visitorid : this.userDetails.userid
        }
        console.log('params:',params);
        this.common.postMethod('OngoingMatch',params).then((res:any) => {
          console.log('res:',res);

          if (res.details.link.length!=0) {
            this.ongoingDetails = res.details.link;
            this.common.presentToast('Ongoing Link Match is Successfully Displayed');
            console.log('OngoingMatch:',this.ongoingDetails);

          } else  {
            this.common.presentToast('Currently You Are Having No Ongoing Link Matches');
          }
        }, err=> {
          console.log('Error:',err);
        });
      }
    }

    swipeNext() {
      console.log('Swipe Next Icon Clicked');
      // this.slides.slideNext(speed?: 400 | , runCallbacks?: false | undefined) => Promise<void>;
    }

    gotoFunny() {
      console.log('Funny Button Clicked');
      this.common.router.navigate(['/funny']);
    }

    gotoArtAndEntertainment() {
      console.log('Art And Entertainment Button clicked');
      this.common.router.navigate(['/art-entertainment']);
    }

    gotoBeautyAndFashion() {
      console.log('Beauty And Fashion Button Clicked');
      this.common.router.navigate(['/beauty-fashion']);
    }

    gotoiMatchTop100() {
      console.log('iMatch Top 100 Button Clicked');
      this.common.router.navigate(['/top-hundred']);
    }

    gotoNews() {
      console.log('News Button Clicked');
      // this.common.router.navigate(['/']);
    }

    gotoBlog() {
      console.log('Blog Button Clicked');
      this.common.router.navigate(['/blog']);
    }

    gotoUserProfile(event,user) {
      console.log('Clicked On A user');
      console.log('user:',user);
      this.common.navCtrl.navigateForward(['/visitors-view-activity'] ,{queryParams: user} );
    }

}
