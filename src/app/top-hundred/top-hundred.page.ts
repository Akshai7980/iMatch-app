import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-top-hundred',
  templateUrl: './top-hundred.page.html',
  styleUrls: ['./top-hundred.page.scss'],
})
export class TopHundredPage implements OnInit {

  userDetails: any = [];
  TopHundred: any;

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
   console.log('Entered into Top Hundred Page');
   let params = {
     userid : this.userDetails.userid
   }
   console.log('params:',params);
   this.common.postMethod('Top100',params).then((res:any) => {
    console.log('res:',res);
    this.TopHundred = res.details;
   });
  }

}
