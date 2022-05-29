import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-art-entertainment',
  templateUrl: './art-entertainment.page.html',
  styleUrls: ['./art-entertainment.page.scss'],
})
export class ArtEntertainmentPage implements OnInit {

  userDetails: any = [];
  ArtEntertainmentDetails: any = [];

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
      category : 'art',
    }
    console.log('params:',params);
    this.common.postMethod('BannerSearch',params).then((res:any) => {
      console.log('res:',res);
      this.ArtEntertainmentDetails = res.details;
    });
   }

}
