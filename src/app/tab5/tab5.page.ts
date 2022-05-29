import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  showMessage = false;
  userDetails : any = [];
  interval: any;
  NotificationDetails: any = [];

  constructor(
    public common: CommonService,
    public storageservice: StorageService,
  ) { 

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.userDetails = resp;
      console.log('userDetails:',this.userDetails);
      console.log('Working on GetNotificationDetails function ....');
      this.GetNotificationDetails();
  });

    // this.interval = setInterval(() => {
    // this.GetNotificationDetails();
    // },3000);

  }

  ionViewWillEnter(){
    this.storageservice.storage.get('userDetails').then((val) => {
      this.userDetails = val;
        if (this.userDetails.userid!=null) {
          this.GetNotificationDetails();
        } else {
          console.log('No userid');
        }
    });
  }

  GetNotificationDetails () {
    this.storageservice.storage.get('userDetails').then((val) => {
      this.userDetails = val;
      const userid = this.userDetails.userid;
      const Api = 'get_profile_pic/';
        this.common.http.get(this.common.ajx.BaseUrl+Api+userid).subscribe((res:any) => {
          console.log('res:',res);
            this.NotificationDetails = res.details[0];
              console.log('NotificationDetails:',this.NotificationDetails);
            this.userDetails = this.NotificationDetails;
          console.log('userDetails:',this.userDetails);
        }, err => {
      console.log('err:',err);
    });
    });
  }

  // ionViewWillLeave(){
  //     clearInterval(this.interval);
  //   console.log('Notification Page Leaved');
  // }

  ngOnInit() {
  }

  openListFans() {
    this.common.navCtrl.navigateForward(['fans'], {queryParams: this.userDetails});
  }

  openListSquad() {
    this.common.navCtrl.navigateForward(['squad-list'], {queryParams: this.userDetails});
  }

  openListBesties() {
    this.common.navCtrl.navigateForward(['besties-before'], {queryParams: this.userDetails});
  }

  openFavourite() {
  }

  openNewMessages() {
    this.common.navCtrl.navigateForward(['chat'], {queryParams: this.userDetails});
  }

  openGroupInvitation() {
  }

  openTagged() {
  }

  openTop100() {
    this.common.router.navigate(['/top-hundred']);
  }

  openHeadliners() {
    this.common.router.navigate(['/headliners']);
  }

  openTrending() {
    this.common.router.navigate(['/trending']);
  }

  openGoodies() {
    this.common.router.navigate(['/goodies']);
  }

  dismissMessage(){
    this.showMessage = false;
  }

  openMessage() {
    this.showMessage = !this.showMessage;
  }

  OpenMatchInvitation() {
    this.common.navCtrl.navigateForward(['invitation'] , {queryParams: this.userDetails});
  }

  togoBack() {
    console.log('Back Button Clicked');
    this.common.router.navigate(['tabs/tab6']);
  }

}
