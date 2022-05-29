import { StorageService } from './../services/storage.service';
import { CommonService } from './../services/common.service';
// import { PopoverController } from '@ionic/angular';
import { Component} from '@angular/core';
// import { NavParams} from '@ionic/angular';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userDetails: any = [];
  // opponentDetails: any;
  // Users: any = [];
  // user: string;

  constructor(
    public common: CommonService,
    // public socialSharing: SocialSharing,
    // public popoverController: PopoverController,
    public storageservice: StorageService,
  ) 
    { 

      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });

    //   this.common.route.queryParams.subscribe(resp => {
    //     this.opponentDetails = resp;
    //     console.log('opponentDetails:',this.opponentDetails);
    // });

    // this.Users = null;
    
    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered into Tab 1 page');

    // let params ={
    //   id : this.userDetails.userid,
    // }
    // console.log('params:',params);
    // this.common.postMethod('Listusers',params).then((res:any) => {
    //   console.log('res:',res);
    //   this.Users = res.details.name;
    //   console.log('users:',this.Users);
    // });

  }

  // toShare() {

  //   const msg = 'Share iMatch with your friends:';

  //   this.socialSharing.share(msg).then(() => {
  //     // Success!
  //   }).catch(() => {
  //     // Error!
  //   });

  // }

  //  toSelectUser(event) {
  //   console.log('event:',event);
  //   console.log('value:',event.detail.value);
  //   if (event.detail.value != '') {
  //     this.presentPopover(event.detail.value);
  //     event.detail.value = null;
  //   } else {
  //       //////////
  //   }
  // }

  gotoSearchUser() {
    console.log('Search Match Users Page Clicked');
    this.common.router.navigate(['/search-match-users']);
  }

  togoBack() {
    console.log('Back Button Clicked');
    this.common.router.navigate(['/tabs/tab6']);
  }

  // async presentPopover(ev:any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     componentProps:{key:ev},
  //     event: ev,
  //     translucent: true,
  //     animated: false
  //   });
  //   return await popover.present();
  // }

}

//  @Component({
//    template: `
//               <div>
//                 <div style="float: right;background-color: #4d4d4e;position: relative;bottom: 14px;right: 0px;border-radius: 5px 5px 5px 10px;height: 26px;width: 26px;" (click)="toClose()">
//                   <ion-icon name="close-circle-outline" style="margin: 3px;color: white;font-size: 20px;font-weight: 600;"></ion-icon></div>
//                   <div *ngIf="User" style="text-align: center; margin: 15px;">
//                   <ion-avatar  style="position: relative;left: 36%;border: 1px solid; padding: 2px;">
//                   <img [src]="User.profile_pic" alt="">
//                   </ion-avatar>
//                   <p>{{User.name}}</p>

//                     <div style="border: 3px solid grey;border-radius: 4px;padding: 10px;"> 
//                     <p style="font-weight: 600;border-bottom: 1px solid;line-height: 30px;">{{User.name}} is in your :</p>
//                     <p *ngIf="User.bestie_category=='yes'">Besties List</p>
//                     <p *ngIf="User.squad_category=='yes'">Squad List</p>
//                     <p *ngIf="User.fan_category=='yes'">Fans List</p>
//                     <p *ngIf="User.fanof_category=='yes'">Fans of List</p>
//                     <p *ngIf="User.bestie_category=='no' && User.squad_category=='no' && User.fan_category=='no' && User.fanof_category=='no'">
//                     {{User.name}} , this user is not in your Besties List, Squad List, Fans List, Fans Of List , But still you can call him for a match</p>
//                     </div>

//                 </div>
//               </div>
//     `
// })

// export class PopoverComponent {

//   User: any  = [];

//   constructor(
//     public popoverController: PopoverController,
//     private common: CommonService,
//     public navParams: NavParams
//     ) {
//       console.log(this.navParams.get('key'));
//      this.User = this.navParams.get('key');
//       console.log('users in popover:',this.User);
//     }

//     ionViewWillEnter(){
//       console.log('ionViewWillEnter:',this.User);
//       }

//       ionViewWillLeave(){
//         console.log('ionViewWillLeave:',this.User);
//         this.common.navCtrl.navigateForward(['/before-match-invitation'], {queryParams: this.User});
//       }

//       toClose() {
//         this.popoverController.dismiss();
//       }

// }