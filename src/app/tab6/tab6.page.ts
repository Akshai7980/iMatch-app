import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, CameraPhoto, Capacitor, PhotosAlbumType, FilesystemEncoding } from '@capacitor/core';
// import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { CommonService } from '../services/common.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
// import { Base64 } from '@ionic-native/base64/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';
import { PopoverController } from '@ionic/angular';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  userDetails: any = [];
  userArray: any = [];
  PersonalMatch: any = [];
  closedMatch: any = [];
  showPersonalMatch: boolean = false;
  showOpenMatch: boolean = false;
  OpenMatch: any;
  showImageIcons: boolean = false;
  closedMatchAudio: any;
  closedMatchLink: any;
  closedMatchText: any;
  categorize: any;
  closedMatchVideo: any;
  PersonalMatchAudio: any;
  PersonalMatchVideo: any;
  PersonalMatchLink: any;
  PersonalMatchText: any;
  isDisableOtherCategory: boolean = true;
  PersonalMatchImage: any;
  OpenMatchImage: any = [];
  OpenMatchAudio: any = [];
  OpenMatchVideo: any = [];
  OpenMatchLink: any = [];
  OpenMatchText: any = [];
  closedMatchImage: any = [];

  constructor(
    private common: CommonService,
    public popoverController: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    public storageservice: StorageService,
    private platform: Platform,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private filePath: FilePath,
    private mediaCapture: MediaCapture,
    // private base64: Base64,
    // private camera: Camera,
    // private fileChooser: FileChooser,
    // private filePicker: IOSFilePicker,
    // private filePath: FilePath,
    ) {

      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });

      this.common.route.queryParams.subscribe(resp => {
        this.userDetails = resp;
        console.log('userDetails:',this.userDetails);

        // this.userDetails = this.userDetails;
        // console.log('Combining both arrays');

        this.ionViewWillEnter();
    });

      this.platform.backButton.subscribeWithPriority(10, () => {
        console.log('Handler was called!');
      });

      const Video_Ext = ['mp4','webm','mpg','mp2','mpeg','mpe','mpv','ogg','m4p','m4v','avi','wmv','mov','qt','flv','swf','avchd'];
      console.log('Video_Ext:',Video_Ext);

     }

     toOpenPersonalMatch() {
       this.showOpenMatch = false;
       this.showPersonalMatch = !this.showPersonalMatch;
     }

     toShowOpenMatch() {
       this.showPersonalMatch = true;
       this.showOpenMatch = !this.showOpenMatch;
     }

     ionViewWillEnter(){

      this.OpenMatch = [];
      this.closedMatch = [];

       this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails in ionViewWillEnter:', val);

        if (val==null) {
          console.log('Storage Value of userDetails is empty');
        } else {
          console.log('Storage Value of userDetails');
          this.userDetails = val;

          const userid = this.userDetails.userid;
          const name = 'get_profile_pic/';
          this.common.http.get(this.common.ajx.BaseUrl+name+userid).subscribe((res:any) => {
            console.log('res:',res);
            this.userArray = res.details[0];
            console.log('change of array');
            this.userDetails = this.userArray;
            console.log('userDetails:',this.userDetails);
            this.storageservice.setStorage('userDetails', res.details[0]);
            console.log('Userdetails details successfully stored');
          });
        }

       if (this.userDetails.userid != '') {

        let params = {
          userid : this.userDetails.userid
        }

        this.common.postMethod('PersonalMatch',params).then((res:any) => {
          console.log('PersonalMatch:',res);
          this.PersonalMatch = res.details.image;
          this.PersonalMatchImage = res.details.image;
          this.PersonalMatchAudio = res.details.audio;
          this.PersonalMatchVideo = res.details.video;
          this.PersonalMatchLink = res.details.link;
          this.PersonalMatchText = res.details.text;
        });

        this.common.postMethod('ClosedMatch',params).then((res:any) => {
          console.log('ClosedMatch:',res);
          this.closedMatchImage = res.details.image;
          this.closedMatchAudio = res.details.audio;
          this.closedMatchLink = res.details.link;
          this.closedMatchText = res.details.text;
          this.closedMatchVideo = res.details.video;

          if (this.closedMatchAudio.length!==0) {
            for (let i=0; i < this.closedMatchAudio.length; i++) {
              this.closedMatch.push(this.closedMatchAudio[i]);
            }
            console.log('closedMatch:', this.closedMatch);
          } 

          if (this.closedMatchImage.length!==0) {
            for (let i=0; i < this.closedMatchImage.length; i++) {
              this.closedMatch.push(this.closedMatchImage[i]);
            }
            console.log('closedMatch:', this.closedMatch);
          } 

          if (this.closedMatchLink.length!==0) {
            for (let i=0; i < this.closedMatchLink.length; i++) {
              this.closedMatch.push(this.closedMatchLink[i]);
            }
            console.log('closedMatch:', this.closedMatch);
          } 

          if (this.closedMatchText.length!==0) {
            for (let i=0; i < this.closedMatchText.length; i++) {
              this.closedMatch.push(this.closedMatchText[i]);
            }
            console.log('closedMatch:', this.closedMatch);
          } 

          if (this.closedMatchVideo.length!==0) {
            for (let i=0; i < this.closedMatchVideo.length; i++) {
              this.closedMatch.push(this.closedMatchVideo[i]);
            }
            console.log('closedMatch:', this.closedMatch);
          } 

        });

        this.common.postMethod('OpenMatch',params).then((res:any) => {
          console.log('OpenMatch:',res);
          this.OpenMatchImage = res.details.image;
          this.OpenMatchAudio = res.details.audio;
          this.OpenMatchVideo = res.details.video;
          this.OpenMatchLink = res.details.link;
          this.OpenMatchText = res.details.text;

          if (this.OpenMatchAudio.length!==0) {
            for (let i=0; i < this.OpenMatchAudio.length; i++) {
              this.OpenMatch.push(this.OpenMatchAudio[i]);
            }
            console.log('OpenMatch:', this.OpenMatch);
          } 

          if (this.OpenMatchImage.length!==0) {
            for (let i=0; i < this.OpenMatchImage.length; i++) {
              this.OpenMatch.push(this.OpenMatchImage[i]);
            }
            console.log('OpenMatch:', this.OpenMatch);
          } 

          if (this.OpenMatchLink.length!==0) {
            for (let i=0; i < this.OpenMatchLink.length; i++) {
              this.OpenMatch.push(this.OpenMatchLink[i]);
            }
            console.log('OpenMatch:', this.OpenMatch);
          } 

          if (this.OpenMatchText.length!==0) {
            for (let i=0; i < this.OpenMatchText.length; i++) {
              this.OpenMatch.push(this.OpenMatchText[i]);
            }
            console.log('OpenMatch:', this.OpenMatch);
          } 

          if (this.OpenMatchVideo.length!==0) {
            for (let i=0; i < this.OpenMatchVideo.length; i++) {
              this.OpenMatch.push(this.OpenMatchVideo[i]);
            }
            console.log('OpenMatch:', this.OpenMatch);
          } 

        });

        // this.OnlineOfflineStatus();
       } else {
         console.log('UserId is Empty');
       }
       });
       this.isDisableOtherCategory = true;
      }

      doRefresh(event) {
        console.log('Begin async operation');

        this.ionViewWillEnter();
    
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
      }

    ngOnInit() {
    }

    goToFansPage() {
      
    }

    OnOffButton(name) {
      console.log('ON / OFF Button Clicked');
      console.log('Name:',name);

      if (name=='Ongoing') {
        this.common.presentToast('Your `Ongoing Matches` Box view is disabled from Visitors');
      } else if (name=='What-would') {
        this.common.presentToast('Your `What Would I Do` Box view is disabled from Visitors');
      } else if (name=='My-Faves') {
        this.common.presentToast('Your `My Faves/Luxury Items & Where To Get` Box view is disabled from Visitors');
      } else if (name=='Best-Moments') {
        this.common.presentToast('Your `Best Moments` Box view is disabled from Visitors');
      } else if (name=='Besties-Action') {
        this.common.presentToast('Your `Besties Action` Box view is disabled from Visitors');
      } else if (name='Last') {
        this.common.presentToast('Your `Besties Action` Box view is disabled from Visitors');
      }
    }

    gotoProfile() {
      this.common.router.navigate(['/tabs/tab7']);
    }

    gotoOnGoingMatch() {
      // this.common.router.navigate(['/tabs/tab8']);
      this.userArray.userStatus;
      this.userArray.visitor_id = this.userDetails.userid;
      this.common.navCtrl.navigateForward(['visitors-ongoing-match'], {queryParams: this.userArray});
    }

  // OnlineOfflineStatus() {
  //   console.log('OnlineOfflineStatus');

  //   let params = {
  //     userid : this.userDetails.userid,
  //     status : '0'
  //   }
  //   this.common.postMethod('Online_Offline_status',params).then((res:any) => {
  //     console.log('res:',res);
  //   });
  // }

  goToPage(page: string) {
    const p = 'tabs/tab6/' + page;
    this.common.router.navigate([p]);

    // const navi
  }

  toShowImageIcons() {
    console.log('To Show Image Icon Clicked');
    this.showImageIcons = true;
  }

  toHideImageIcons() {
    console.log('To Hide Image Icon Clicked');
    this.showImageIcons = false;
  }

  gotoImageIcon(icon) {
    console.log('Icon:',icon);
    this.isDisableOtherCategory = false;
    if (icon == 'image') {

      if (this.PersonalMatch.length!==0) {

        // this.common.showLoader();
        this.common.presentLoading();

        // this.closedMatch = this.closedMatch;
        // this.ionViewWillEnter();
        this.PersonalMatch = this.PersonalMatchImage;
        console.log('PersonalMatchImage',this.PersonalMatch);
        this.common.presentToast('Image Match is Successfully Displayed');
        // this.common.hideLoader();

      } else {

        // this.common.showLoader();
        // this.closedMatch = this.closedMatch;
        this.common.presentToast('You are not having any image match');
        // this.common.hideLoader();

      }

    } else if (icon == 'video') {

      if (this.PersonalMatch.length!==0) {

        // this.common.showLoader();
        this.common.presentLoading();
        this.PersonalMatch = this.PersonalMatchVideo;
        console.log('PersonalMatchVideo',this.PersonalMatch);

        // this.closedMatch = this.closedMatchVideo;
        this.common.presentToast('Video Match is Successfully Displayed');
        // this.common.hideLoader();

      } else {

        // this.common.showLoader();
        // this.closedMatch = this.closedMatch;
        this.common.presentToast('You are not having any video match');
        // this.common.hideLoader();

      }

      // this.common.presentToast('You are not having any Video Match');
    } else if (icon == 'audio') {

      if (this.PersonalMatch.length!==0) {

        // this.common.showLoader();
        this.common.presentLoading();
        this.PersonalMatch = this.PersonalMatchAudio;
        console.log('PersonalMatchAudio',this.PersonalMatch);

        // this.closedMatch = this.closedMatchAudio;
        this.common.presentToast('Audio Match is Successfully Displayed');
        // this.common.hideLoader();

      } else {

        // this.common.showLoader();
        // this.closedMatch = this.closedMatch;
        this.common.presentToast('You are not having any audio match');
        // this.common.hideLoader();

      }

      // this.common.presentToast('You are not having any Audio Match');
    } else if (icon == 'attachment') {

      if (this.PersonalMatch.length!==0) {

        // this.common.showLoader();
        this.common.presentLoading();
        this.PersonalMatch = this.PersonalMatchText;
        console.log('PersonalMatchText',this.PersonalMatch);

        // this.closedMatch = this.closedMatchText;
        this.common.presentToast('Text Match is Successfully Displayed');
        // this.common.hideLoader();

      } else {

        // this.common.showLoader();
        // this.closedMatch = this.closedMatch;
        this.common.presentToast('You are not having any text match');
        // this.common.hideLoader();

      }

      // this.common.presentToast('You are not having any Attachment Match');

    } else if (icon == 'link') {

      if (this.PersonalMatch.length!==0) {

        // this.common.showLoader();
        this.common.presentLoading();
        this.PersonalMatch = this.PersonalMatchLink;
        console.log('PersonalMatchLink',this.PersonalMatch);

        // this.closedMatch = this.closedMatchLink;
        this.common.presentToast('Link Match is Successfully Displayed');
        // this.common.hideLoader();

      } else {

        // this.common.showLoader();
        // this.closedMatch = this.closedMatch;
        this.common.presentToast('You are not having any link match');
        // this.common.hideLoader();

      }

      // this.common.presentToast('You are not having any Link Match');
    }
  }

  goToBestiesList() {
    this.common.navCtrl.navigateForward(['/besties-before'], {queryParams: this.userDetails});
  }

  gotoCallForAMatch() {
    console.log('Call For A Match Button Clicked');
    this.common.router.navigate(['/tabs/tab3']);
  }

  // goToPage() {
  //   this.common.navCtrl.navigateForward(['fans'] , {queryParams: this.userDetails});
  // }

  goToFansOfPage() {
    this.common.navCtrl.navigateForward(['fans-of'] , {queryParams: this.userDetails});
  }

  goToSquadListPage() {
    this.common.navCtrl.navigateForward(['squad-list'] , {queryParams: this.userDetails});
  }

  goToOpenMatch(event, open, index: number, cat) {
    console.log('Entered into Open Match page');
    console.log('open:',open);
    this.userDetails.userType = 'owner';
    this.userDetails.personalMatchSlideIndex = index;
    this.userDetails.fileType = open.sender_image_type;
    this.userDetails.category = cat;
    this.common.navCtrl.navigateForward(['open-match'], {queryParams: this.userDetails});
  }

  goToPersonalMatch(e, match, index: number, cat) {
    console.log('Entered into Personal Match page:',match);
    this.userDetails.userType = 'owner';
    this.userDetails.personalMatchSlideIndex = index;
    this.userDetails.fileType = match.sender_image_type;
    this.userDetails.category = cat;
    this.common.navCtrl.navigateForward(['personal-match'], {queryParams: this.userDetails});
  }

  gotoSearchUsers() {
    this.common.navCtrl.navigateForward(['/search-users'], {queryParams: this.userDetails});
  }

  gotoBestiesAction() {
    this.common.router.navigate(['/besties-actions']);
  }

  gotoWhatWouldIDoIf() {
    this.common.router.navigate(['/what-would-i-do']);
  }

  gotoBestMoments() {
    this.common.router.navigate(['/best-moments']);
  }

  scrollTo(elementId: string) {

    // const x = document.getElementById(elementId).offsetTop;
    // this.content.scrollToPoint(0, 220);

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      mode: "ios",
      translucent: true
    });
    return await popover.present();
  }

  gotoPersonalMatchUpload() {
    this.common.navCtrl.navigateForward(['personal-match-media-upload'], {queryParams: this.userDetails});
  }

  gotoSettings() {
    this.common.navCtrl.navigateForward(['settings']);
  }

  // async presentActionSheet() {
  //   console.log('Action Sheet Clicked');
  //   let actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Choose Minimum 2 File For Personal Match',
  //     buttons: [
  //       {
  //         text: 'Share Links',
  //         icon: 'link',
  //         handler: () => {
  //           this.PickLinks();
  //           console.log('Share clicked');
  //         }
  //         },

  //         {
  //           text: 'Capture Image',
  //           icon: 'camera',
  //           handler: () => {
  //             // this.pickImage(CameraSource.Camera);
  //             this.CaptureImage();
  //             console.log('Camera clicked');
  //           }
  //         }, 

  //         {
  //         text: 'Capture Video',
  //         icon: 'images',

  //         handler: () => {
  //           this.CaptureVideo();
  //           console.log("Gallery clicked");
  //         }
  //       },

  //       {
  //         text: 'Capture Audio',
  //         icon: 'camera',

  //         handler: () => {
  //           this.CaptureAudio();
  //           console.log("Camera clicked");
  //         }
  //         },

  //         {
  //         text: 'Other Files',
  //         icon: 'folder-open',
  //         handler: () => {
  //           this.PickDocuments();
  //           console.log('Folder clicked');
  //         }
  //         },

  //         {
  //         text: "Cancel",
  //         role: "cancel",
  //         handler: () => {
  //           console.log("Cancel clicked");
  //         }
  //       }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  //     CaptureImage() {

  //       const options: CaptureImageOptions = { limit: 2 };
  //       this.mediaCapture.captureImage(options)
  //         .then(
  //           (data: MediaFile[]) => {
  //             console.log(data[0]);
  //             this.uploadFile2(data[0], 'image');
  //           },
  //           (err: CaptureError) => console.error(err)
  //         );

  //     }

  //     CaptureVideo() {

  //       const options: CaptureImageOptions = { limit: 2 };
  //       this.mediaCapture.captureVideo(options)
  //       .then(
  //         (data: MediaFile[]) => {
  //           console.log(data[0]);
  //           this.uploadFile2(data[0], 'video');
  //         },
  //         (err: CaptureError) => console.error(err)
  //       );
    
  //     }

  //     CaptureAudio() {

  //       const options: CaptureImageOptions = { limit: 2 };
  //       this.mediaCapture.captureAudio(options)
  //       .then(
  //         (data: MediaFile[]) => {
  //           console.log(data[0]);
  //           this.uploadFile2(data[0], 'audio');
  //         },
  //         (err: CaptureError) => console.error(err)
  //       );
    
  //     }

  //     pickLinks() {
  //       console.log('Pick Links Button Presses');
  //         this.isLink = true;
  //           console.log('isLink:',this.isLink);
  //             this.hideImageSpace = false;
  //               console.log('hideImageSpace:',this.hideImageSpace);
  //     }



}

@Component({
  template: `
        <ion-list mode="ios">
            <ion-item (click)="onDismiss('editprofile')">Edit Profile</ion-item>
            <ion-item (click)="onDismiss('addbesties')">Add Besties</ion-item>
            <ion-item (click)="onDismiss('addsquadlist')">Add to squad list</ion-item>
            <ion-item (click)="onDismiss('fans-of')">Booking</ion-item>
        </ion-list>
    `
})

export class PopoverComponent {
  userDetails: any;
  constructor(
    public popoverController: PopoverController,
    public storageservice: StorageService,
    private common: CommonService,
    ) {
      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });
    }

  async onDismiss(val) {
    try {
    
      this.popoverController.dismiss(val);
      if(val=='editprofile'){
            this.common.router.navigate(['/profile'], {queryParams: this.userDetails});
      }else if(val=='addbesties'){
            this.common.router.navigate(['/besties'], {queryParams: this.userDetails}); 
      }else if(val=='addsquadlist'){
            this.common.router.navigate(['/squad-list'], {queryParams: this.userDetails});
      }else if(val=='fans-of'){
            // this.common.router.navigate(['/fans-of']);
      }
      
    } catch (e) {
      console.log(e);
        //click more than one time popover throws error, so ignore...
    }

  }
}
