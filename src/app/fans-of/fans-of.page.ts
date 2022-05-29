import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-fans-of',
  templateUrl: './fans-of.page.html',
  styleUrls: ['./fans-of.page.scss'],
})
export class FansOfPage implements OnInit {

  userDetails: any = [];
  myfanof: any = [];

  constructor(
    public storageservice: StorageService,
    public common: CommonService,
  ) { 

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.userDetails = resp;
      console.log('userDetails:',this.userDetails);
  });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){

    console.log('Entered into Fans Of Page');
    this.common.showLoader();
    // this.storageservice.storage.get('userDetails').then((val) => {

    //   this.userDetails = val;

    //   if (this.userDetails.userid != '') {

        let params = {
          id : this.userDetails.userid
        }

        console.log('params:',params);
        // this.common.presentLoading();
        this.common.postMethod('Listbesties',params).then((res:any) => {
         console.log('res:',res);

         this.myfanof = res.details.fan_of;
         console.log('myfanof:',this.myfanof);

         if (this.myfanof.length==0) {

          this.common.presentToast('You are having no `Fan Of` to show');

      } else {

          this.common.presentToast('You are having '+ res.details.fan_of.length + ' fan of list members to show');
      
        }
        this.common.hideLoader();

       }, err => {

         console.log('Error:',err);
        this.ionViewWillEnter();
       });

  //   } else {

  //     this.common.presentToast('Something Went Wrong !!!');

  //   }

  // });

}


  gotoSearchFansOf() {
    console.log('Fans Of Search Icon Clicked');
    this.common.navCtrl.navigateForward(['/search-fans-of'] , {queryParams: this.userDetails});
  }

  gotoProfile() {
    this.common.navCtrl.navigateForward(['/tabs/tab7'], {queryParams: this.userDetails});
  }

  toRemoveFansOf(event,fan) {
    console.log('Fans Of Remove Button Clicked');
    console.log('fans of:',fan);

    let params = {
      fanid : fan.tableid,
    }
    console.log('params',params);
    this.common.postMethod('RemoveFans',params).then((res:any) => {
      console.log('res:',res);

      if (res.status == true) {
        this.common.presentToast( fan.name + 'is successfully removed from your Fan Of list');
        this.ionViewWillEnter();
      } else {
        /////
      }
    } , err => {
      console.log('E:',err);
    });
  }

}
