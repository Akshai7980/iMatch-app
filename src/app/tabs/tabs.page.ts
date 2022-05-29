import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isIcon2Activated: boolean = false;
  isIcon3Activated: boolean = false;
  userDetails: any = [];

  constructor(
    public common: CommonService,
    public storageservice: StorageService,
  ) { }

  GoToPersonlMatchUpload() {
    this.common.navCtrl.navigateForward(['personal-match-media-upload']);
  }

  TabClicked (e,tab) {
    // console.log(e);

    if (tab==='Tab1') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = false;

    } else if (tab==='Tab2'){

      this.isIcon2Activated = true;
      this.isIcon3Activated = false;

    } else if (tab==='Tab3') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = true;

    } else if (tab==='Tab4') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = false;

    } else if (tab==='Tab5') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = false;

    } else if (tab==='Tab6') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = false;

    } else if (tab==='Tab7') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = false;

    } else if (tab==='Tab8') {

      this.isIcon2Activated = false;
      this.isIcon3Activated = false;

    }

  }

}
