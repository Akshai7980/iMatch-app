import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-visitors-besties-view',
  templateUrl: './visitors-besties-view.page.html',
  styleUrls: ['./visitors-besties-view.page.scss'],
})
export class VisitorsBestiesViewPage implements OnInit {

  UserInfo: any = [];
  mybesties: any = [];
  ourStory: any = [];
  ourSlogan: any = [];
  ourLetter: any = [];
  showContent: {[key: number]: boolean} = {}

  constructor(
    public storageservice: StorageService,
    public common: CommonService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.GetUserDetails();
  }

  ionViewWillLeave() {
   this.common.hideLoader();
  }

  GetUserDetails() {
    this.common.route.queryParams.subscribe(async resp => {
      this.UserInfo = resp;
      console.log('UserInfo',this.UserInfo);
      await this.GetBestiesList();
    });
  }

  GetBestiesList() {
    let params = {
      id: this.UserInfo.userid,
    }
    console.log('params:',params);
    this.common.showLoader();
    this.common.postMethod('Listbesties',params).then(async (res:any) => {
      console.log('res:',res);
      await this.common.hideLoader();
      this.mybesties = res.details.besties;
      console.log('mybesties:',this.mybesties);
    }, async (err) => {
      console.log('Error:',err);
      await this.common.hideLoader();
    });
  }

  ToViewBestiesContent(e, bestie, i, type) {
    if (type==='show') {
      this.showContent = {} = {};
      this.showContent[i] = true;
      this.ToGetContents(bestie, i);
    } else {
      this.showContent[i] = false;
    }
  }

  ToGetContents (bestie, i) {
    let params = {
      userid : this.UserInfo.userid,
      senderid : bestie.userid
    }
    console.log('params',params);
    this.common.postMethod('GetStatus',params).then((res:any) => {
      console.log('res:',res);
      this.ourStory = res.details.story;
      this.ourSlogan = res.details.slogan;
      this.ourLetter = res.details.letter;
    });
  }

}
