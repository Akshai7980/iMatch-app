import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  // userDetails: any;
  ongoingDetails: any;
  showPersonalScores: boolean = false;
  hideValue: boolean = true;

  RemainingTime: number;
  interval: any;
  HoursAgo: number;


  public searchControl: FormControl;

  public searchTerm: string = "";
  searching: any = false;
  ShowFooter: any = true;
  showCategory: boolean = true;

  userDetails : any = [];
  allUsers: any = [];
  BestiesList: any = [];
  SquadList: any = [];
  Fans: any = [];
  FansOf: any = [];

  constructor(
    public storageservice: StorageService,
    private common: CommonService,    
    public popoverController: PopoverController,
    public socialSharing: SocialSharing,

    ) 
    {

      this.searchControl = new FormControl();

      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });
      
    }

    ngOnInit() {

      this.listAllUsers();
      this.setFilteredItems();

      this.searchControl.valueChanges
      .pipe(debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe(search => {
        this.searching = false;
        this.showCategory = true;
        this.searchTerm = search;
        this.setFilteredItems();
      });

    }
  
    ionViewWillEnter() {
  
      console.log('in ionViewWillEnter');
  
      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
        if (this.userDetails.userid!=undefined) {
  
          this.listAllUsers();
          this.toGetUsersCategory();
  
        } else {
          console.log('*** UserId undefined ***');
        }
  
  
      });
  
      // this.presentPopover();
  
    }
  
    listAllUsers() {
  
      let params = {
        userid : this.userDetails.userid
      }
  
      console.log('userid:',params);
      this.common.listUsers('Listusers',params).subscribe((res:any) => {
        console.log('res:',res);
        this.allUsers = res.details.name;
        console.log('allUsers:',this.allUsers);
      });
  
    }
  
    onSearchInput(e) {
      this.searching = true;
      this.showCategory = false;
      console.log('E:',e);
      this.setFilteredItems();
    }
  
    setFilteredItems() {
      this.allUsers = this.filterItems(this.searchTerm);
    }
  
    addToMatch(event,user) {
      console.log('user:',user);
      this.common.navCtrl.navigateForward(['/before-match-invitation'], {queryParams: user});
    }
  
    filterItems(searchTerm) {
      console.log(searchTerm);
      return this.allUsers.filter(user => {
        return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
  
    }

    gotoVisitorsActivity(event,user){
      console.log('Entered Into Visitors Activity Page');
      console.log('user:',user);
      this.common.navCtrl.navigateForward(['/visitors-view-activity'], {queryParams: user});
    }
  
    togoBack() {
      this.common.router.navigate(['/tabs/tab6']);
    }
  
    toShare() {
  
      const msg = 'Share iMatch with your friends:';
  
      this.socialSharing.share(msg).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  
    }
  
    toListCategory(val) {
  
      console.log('To List Specific Category Clicked');
      this.ShowFooter=false;
      console.log('Value:',val);
  
          if (val=='bestie') {
  
            if (this.BestiesList.length!=0) {
  
              this.common.presentLoading();
              this.allUsers = this.BestiesList ;
              console.log('allUsers:',this.allUsers);
              this.common.presentToast('Your Bestie List is Successfully Fetched ...');
  
            } else {
  
              this.allUsers = this.BestiesList ;
              this.common.presentToast('You are having no besties in your Bestie List');
  
            }
  
          } else if (val=='squad') {
  
            if (this.SquadList.length!=0) {
  
              this.common.presentLoading();
              this.allUsers = this.SquadList;
              console.log('allUsers:',this.allUsers);
              this.common.presentToast(' Your Squad List is Successfully Fetched ... ');
  
            } else {
  
              this.allUsers = this.SquadList;
              this.common.presentToast(' You are having no squad in your `Squad List` ');
              
            }
  
          } else if (val=='fan') {
  
            if (this.Fans.length!=0) {
  
              this.common.presentLoading();
              this.allUsers = this.Fans;
              console.log('allUsers:',this.allUsers);
              this.common.presentToast(' Your Fan List is Successfully Fetched ... ');
  
            } else {
  
              this.allUsers = this.Fans;
              this.common.presentToast(' You are having no fans in your `Fans List` ');
              
            }
  
          } else if (val=='fan-of') {
  
            if (this.FansOf.length!=0) {
  
              this.common.presentLoading();
              this.allUsers = this.FansOf;
              console.log('allUsers:',this.allUsers);
              this.common.presentToast(' Your Fan Of List is Successfully Fetched ... ');
  
            } else {
              
              this.allUsers = this.FansOf;
              this.common.presentToast(' You are having no fan of in your `Fan Of List` ');
              
            }
  
          } else if (val=='invite') {
  
              this.toShare();
              this.listAllUsers();
  
          }
  
    }
  
    toGetUsersCategory() {
  
      console.log('To Get User Category Wise Working');
  
      let params = {
        id : this.userDetails.userid
      }
  
      console.log('params:',params);
      this.common.postMethod('Listbesties',params).then((res:any) => {
        console.log('res:',res);
  
        if (res.status == true) {
  
          this.BestiesList = res.details.besties;
          this.SquadList = res.details.squad;
          this.Fans = res.details.fan;
          this.FansOf = res.details.fan_of;
  
        } else {
  
          this.common.presentToast(' Error Loading Categories ');
  
        }
  
      } , err => {
  
        console.log('Error:',err);
  
      });
  
    }
  
    async presentPopover() {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        cssClass: 'c-ion-popover-md-h',
        showBackdrop: true,
        translucent: true
      });
      return await popover.present();
    }



    // ionViewWillEnter(){
    //   console.log('Entered into Invitation page');
   
    //    this.storageservice.storage.get('userDetails').then((val) => {
    //      this.userDetails = val ;
   
    //      if ( this.userDetails.userid != '' ) {
   
    //        let params = {
    //          userid : this.userDetails.userid,
    //          visitorid : ''
    //        }
   
    //        console.log('params:',params);
    //        this.common.postMethod('OngoingMatch',params).then((res:any) => {
    //          console.log('res:',res);
    //          this.ongoingDetails = res.details;
    //          console.log('invitationDetails:', this.ongoingDetails);
    //        }, err => {
    //         console.log('Error:',err);
    //         this.common.presentLoading();
    //         this.common.presentToast(' A Network Error Occured... Please Try Once Again');
    //        });
    //      }
    //    });

    //    if (this.ongoingDetails?.length==0) {

    //      clearInterval(this.interval);
         
    //    } else {

    //     this.interval = setInterval(() => {
    //       this.Timer();
    //     }, 1000);

    //    }
   
    //  }

    //  Timer() {
    //    console.log('Timer is running');

    //    console.log('Time left:',this.ongoingDetails[0]?.match_end);
    //    console.log('Time left:',this.ongoingDetails[0]?.match_start);

    //    let StartTime = new Date(this.ongoingDetails[0]?.match_start).getTime();
    //    console.log('countDownDate:',StartTime);

    //    let EndTime = new Date(this.ongoingDetails[0]?.match_end).getTime();
    //    console.log('now:',EndTime);

    //    let CurrentTime = new Date().getTime();
    //    console.log('CurrentTime:',CurrentTime);

    //    let TotalRemaining = EndTime - StartTime ;
    //    console.log('TotalRemaining:',TotalRemaining);

    //    let LeftTime = TotalRemaining - CurrentTime;
    //    this.RemainingTime = LeftTime;
    //    console.log('left:',LeftTime ,'RemainingTime:',this.RemainingTime);

    //    let TimeAgo = CurrentTime - StartTime;
    //    console.log('TimeAgo:',TimeAgo);
    //    this.HoursAgo = TimeAgo;
    //    console.log('HoursAgo:',this.HoursAgo);

    //  }

    //  toLikeForReceiver(e,details) {
    //   console.log('Receiver side post Liked');
    //   let params = {
    //     userid : this.userDetails.userid,
    //     matchid : details.match_id,
    //     contestentid : details.receiverid,
    //     status : 'like',
    //             }
    //   console.log('details:',details);
    //   console.log('params:',params);
    //   this.common.postMethod('Like',params).then((res:any) => {
    //     console.log('res:',res);
    //     if (res.status == true) {
    //       this.ionViewWillEnter();
    //     } else {
    //       this.common.presentToast('You had already liked this Ongoing Match');
    //     }
    //   }, err => {
    //     console.log('Error:',err);
    //     this.common.presentLoading();
    //     this.common.presentToast(' A Network Error Occured... Please Try Once Again');
    //   });
    //  }

    //  toLikeForSender(e,details) {
    //    console.log('Sender side post liked');
    //    let params = {
    //      userid : this.userDetails.userid,
    //      matchid : details.match_id,
    //      contestentid : details.senderid,
    //     status : 'like'
    //    }
    //    console.log('details:',details);
    //    console.log('params:',params);
    //    this.common.postMethod('Like',params).then((res:any) => {
    //      console.log('res:',res);
    //      if (res.status == true) {
    //       this.ionViewWillEnter();
    //     } else {
    //       this.common.presentToast('You had already liked this Ongoing Match');
    //     }
    //    }, err => {
    //     console.log('Error:',err);
    //     this.common.presentLoading();
    //     this.common.presentToast(' A Network Error Occured... Please Try Once Again');
    //    });
    //  }


    // openComments(e,details) {
    //   console.log(details);
    //   this.common.router.navigate(['/comments'], {queryParams : details});
    // }

    // toshowPersonalScores(e,details) {
    //   console.log('details:',details);
    //   this.showPersonalScores = !this.showPersonalScores;
    // }

    // toHidePopover () {
    //   console.log('To Hide Popover Clicked');
    //   this.showPersonalScores = false;
    // }

    // gotoImageIcon(icon) {
    //   console.log('Icon:',icon);
    //   if (icon == 'image') {
    //     if (this.ongoingDetails != '') {
    //       this.common.presentToast('Image Match is Successfully Displayed');
    //     } else {
    //       this.common.presentToast('Currently You Are Having No Ongoing Matches');
    //     }
    //   } else if (icon == 'video') {
    //     if (this.ongoingDetails != '') {
    //       this.common.presentToast('You are not having any Video Match');
    //     } else {
    //       this.common.presentToast('Currently You Are Having No Ongoing Matches');
    //     }
    //   } else if (icon == 'audio') {
    //     if (this.ongoingDetails != '') {
    //       this.common.presentToast('You are not having any Audio Match');
    //     } else {
    //       this.common.presentToast('Currently You Are Having No Ongoing Matches');
    //     }
    //   } else if (icon == 'attachment') {
    //     if (this.ongoingDetails != '') {
    //       this.common.presentToast('You are not having any Attachment Match');
    //     } else {
    //       this.common.presentToast('Currently You Are Having No Ongoing Matches');
    //     }
    //   } else if (icon == 'link') {
    //     if (this.ongoingDetails != '') {
    //       this.common.presentToast('You are not having any Link Match');
    //     } else {
    //       this.common.presentToast('Currently You Are Having No Ongoing Matches');
    //     }
    //   }
    // }

}

//  @Component({
//    template: `
//             <div>

//             <div>
//             <ion-item>
//             <ion-avatar>
//             <ion-img [src]=""></ion-img>
//             </ion-avatar>
//             <span></span>
//             <ion-img [src]=""></ion-img>
//             <span></span>
//             </ion-item>

//             <ion-item>
//             <ion-avatar>
//             <ion-img [src]=""></ion-img>
//             </ion-avatar>
//             <span></span>
//             <ion-img [src]=""></ion-img>
//             <span></span>
//             </ion-item>
//             </div>

//             </div>
//     `
// })

// export class PopoverComponent {

//   Details: any = [];

//   constructor(
//     public popoverController: PopoverController,
//     private common: CommonService,
//     public navParams: NavParams

//   ) {
//       console.log(this.navParams.get('key'));
//      this.Details = this.navParams.get('key');
//       console.log('users in popover:',this.Details);
//   }
// }


@Component({
  template: `
  <div style="padding: 15px; background-color: #707072;">
    <div style="border: 1px solid #ffffff8f; padding: 15px; border-radius: 4px; color: #dcdcdc;">
      <img src="../../assets/icon/help-invitation-terms/bar.png" alt="">
      <h6>Hai {{userDetails.name}} !</h6>
      <h2>Whom you want to call for a media match ?
      </h2>
    </div>
  </div>  
   `,
   styles: [` .my-custom-class: --width: 300px `]
})

export class PopoverComponent {

  userDetails: any = [];

 constructor(
   public popoverController: PopoverController,
   public storageservice: StorageService,

 ) {}

    ionViewWillEnter(){
      console.log('Entered Into Popover Page');
      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });

       setTimeout(() => {
         this.popoverController.dismiss();
       }, 4000);

    }
}