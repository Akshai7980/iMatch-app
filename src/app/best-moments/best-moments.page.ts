import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-best-moments',
  templateUrl: './best-moments.page.html',
  styleUrls: ['./best-moments.page.scss'],
})

export class BestMomentsPage implements OnInit {

  userDetails: any = [];
  BestMoments: any = [];
  BestMomentsImages: any = [];

  constructor(

    public storageservice: StorageService,
    private common: CommonService

  ) { 

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){

   console.log('Entered into Best Moments Page');

  //  this.common.showLoader();

   this.storageservice.storage.get('userDetails').then((val) => {
    this.userDetails = val;

    let params = {
      userid : this.userDetails.userid
    }

    console.log('params:',params);
    this.common.postMethod('GetBestMoment',params).then((res:any) => {
      console.log('res:',res);
      // this.common.presentToast
      this.common.presentLoading();
      this.BestMoments = res.details.moments;
      this.BestMomentsImages = res.details.moments_files;

    });
    
  });

  }

  gotoAddBestMoments() {
    this.common.router.navigate(['/best-moments-add']);
  }

  gotoUserProfile() {
    this.common.router.navigate(['tabs/tab7'], {queryParams: this.userDetails});
  }

  toAddMedia(event,moments) {
    console.log('moments:',moments);
    this.common.navCtrl.navigateForward(['/best-moments-add'], {queryParams: moments});
  }

  gotoBestMomentComments(e,moments) {
    console.log('moments:',moments);
    this.common.navCtrl.navigateForward(['/best-moment-comment'], {queryParams: moments});
  }

  ToLikeBestMoment (e, moments) {
    console.log('moments:',moments);

    let params = {
      userid : this.userDetails.userid,
      momentid : moments.momentid
    }
    console.log('params:',params);
    this.common.postMethod('MomentLike',params).then((res:any) => {
      console.log('res:',res.details);

      if (res.status == true) {
        this.ionViewWillEnter();
      }
    }, err => {
      console.log('Error:',err);
    });
  }

}
