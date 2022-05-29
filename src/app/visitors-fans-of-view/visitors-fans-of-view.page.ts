import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-visitors-fans-of-view',
  templateUrl: './visitors-fans-of-view.page.html',
  styleUrls: ['./visitors-fans-of-view.page.scss'],
})
export class VisitorsFansOfViewPage implements OnInit {

  UserInfo: any = [];
  myfanof: any = [];

  constructor(
    public storageservice: StorageService,
    public common: CommonService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered Into Visitors Fans Of View Page');
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
        this.myfanof = res.details.fan_of;
        console.log('myfanof:',this.myfanof);
      }, (err) => {
        console.log('Error:',err);
        console.log(err.headers);
      });
  });
  }

}
