import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-visitors-squad-list-view',
  templateUrl: './visitors-squad-list-view.page.html',
  styleUrls: ['./visitors-squad-list-view.page.scss'],
})
export class VisitorsSquadListViewPage implements OnInit {

  UserInfo: any = [];
  mysquads: any = [];

  constructor(
    public storageservice: StorageService,
    private common: CommonService,
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
        this.mysquads = res.details.squad;
        console.log('mysquads:',this.mysquads);
      }, (err) => {
        console.log('Error:',err);
        console.log(err.headers);
      });
  });
  }

}
