import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-beauty-fashion',
  templateUrl: './beauty-fashion.page.html',
  styleUrls: ['./beauty-fashion.page.scss'],
})
export class BeautyFashionPage implements OnInit {

  userDetails: any = [];
  BeautyFashionDetails: any = [];

  constructor(
    public storageservice: StorageService,
    private common: CommonService
  ) {

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
      if (this.userDetails.userid != '' ) {
        this.ionViewWillEnter();
      }
    });

   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered Into Funny Posts Page');
    let params = {
      userid : this.userDetails.userid ,
      category : 'beauty',
    }
    console.log('params:',params);
    this.common.postMethod('BannerSearch',params).then((res:any) => {
      console.log('res:',res);
      this.BeautyFashionDetails = res.details;
    });
   }

}