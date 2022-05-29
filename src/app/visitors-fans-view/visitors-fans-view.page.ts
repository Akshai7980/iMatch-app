import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-visitors-fans-view',
  templateUrl: './visitors-fans-view.page.html',
  styleUrls: ['./visitors-fans-view.page.scss'],
})
export class VisitorsFansViewPage implements OnInit {

  UserInfo: any = [];
  myfans: any = [];

  constructor(
    public storageservice: StorageService,
    public common: CommonService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered Into Visitors Fans View Page');
    this.common.route.queryParams.subscribe(resp => {
      this.UserInfo = resp;
      console.log('UserInfo:',this.UserInfo);

      let params = {
        id: this.UserInfo.userid,
      }
      console.log('params:',params);
      this.common.presentLoading();
      this.common.postMethod('Listbesties',params).then((res:any) => {
        console.log('res:',res);
        this.myfans = res.details.fan;
        console.log('myfans:',this.myfans);
      }, (err) => {
        console.log('Error:',err);
        console.log(err.headers);
      });
  });
  }

}
