import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-best-moment-visitors-view',
  templateUrl: './best-moment-visitors-view.page.html',
  styleUrls: ['./best-moment-visitors-view.page.scss'],
})

export class BestMomentVisitorsViewPage implements OnInit {

  BestMomentsImages: any = [];
  BestMoments: any = [];
  userDetails: any = [];
  UserInfo: any = [];

  constructor(

    public storageservice: StorageService,
    private common: CommonService

  ) { 

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.UserInfo = resp;
      console.log('UserInfo:',this.UserInfo);
  });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){

   console.log('Entered into Best Moment Visitors View page');

   let params  = {
     userid : this.UserInfo.userid
   }

   console.log('params:',params);
   this.common.postMethod('GetBestMoment',params).then((res:any) => {
     console.log('res:',res);

     this.common.presentLoading();
     this.BestMoments = res.details.moments;
     this.BestMomentsImages = res.details.moments_file;

   }, (err) => {

     console.log('Error:',err);

   });

  }

  toLike(e,moments) {

    console.log(' Best Moment Like Button Clicked ');
    console.log('Moments:',moments);

    let params = {
      userid : this.userDetails.userid,
      momentid : moments.momentid
    }

    console.log('Params:',params);
    this.common.postMethod('MomentLike',params).then((res:any) => {
      console.log('res:',res);

      if (res.status == true) {

        this.ionViewWillEnter();

      } else {

        this.common.presentToast(' 🛑 Something went wrong !!! ');

      }

    }, (err) => {

      console.log('Error:',err);

    });

  }

  gotoComment(e,moments) {

    console.log(' Best Moment Comment Button Clicked ');
    console.log('Moments:',moments);

    this.common.navCtrl.navigateForward(['/best-moment-visitors-comment'] , {queryParams: moments});
    
  }

}
