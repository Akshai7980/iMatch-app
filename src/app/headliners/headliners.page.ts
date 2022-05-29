import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-headliners',
  templateUrl: './headliners.page.html',
  styleUrls: ['./headliners.page.scss'],
})
export class HeadlinersPage implements OnInit {

  headliners = [{
    name: 'Ebond Gold'
  },
  {
    name: 'Sally Brint'
  },
  {
    name: 'Pritty Kavitha'
  },
  {
    name: 'Linne Craig'
  },
  {
    name: 'Layla'
  },
  ];

  windowHeight: any;
  userDetails: any = [];
  FirstHeadliner: any;
  SecondHeadliner: any;
  ThirdHeadliner: any;
  FourthHeadliner: any;
  FifthHeadliner: any;
  SixthHeadliner: any;

  constructor(
    public storageservice: StorageService,
    private common: CommonService) { 

      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });

    }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
  }

  ionViewWillEnter(){
    console.log('Entered into Headliners Page');
   let params = {
     userid : this.userDetails.userid,
   }
   console.log('params:',params);
   this.common.postMethod('Headline',params).then((res:any) => {
    console.log('res:',res);
    this.FirstHeadliner = res.details.first_headline;
    this.SecondHeadliner = res.details.second_headline;
    this.ThirdHeadliner = res.details.Third_headline;
    this.FourthHeadliner = res.details.Fourth_headline;
    this.FifthHeadliner = res.details.Fifth_headline;
    this.SixthHeadliner = res.details.Sixth_headline;
   });
  }

  toAddFirstUserasFan(event,FirstHeadliner) {
    console.log('Add User As Fan Button Clicked');
    console.log('FirstHeadliner:',FirstHeadliner);
    if (FirstHeadliner.userid != '') {
      let params  = {
        from : this.userDetails.userid,
        to : FirstHeadliner.userid,
        category : 'fan'
      }
      console.log('params:',params);
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(FirstHeadliner.name + ' is added to your fan list');
        } else if (res.message == "Already added ") {
          this.common.presentToast(FirstHeadliner.name + ' is already added to your fans list ...');
        } else {
          ///////////////
        }
      });
    } else {
      this.common.presentToast('Here is no headliner to add as fan');
    }
  }

  toAddSecondUserasFan(event,SecondHeadliner) {
    console.log('Add User As Fan Button Clicked');
    console.log('SecondHeadliner:',SecondHeadliner);
    if (SecondHeadliner.userid != '') {
      let params  = {
        from : this.userDetails.userid,
        to : SecondHeadliner.userid,
        category : 'fan'
      }
      console.log('params:',params);
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(SecondHeadliner.name + ' is added to your fan list');
        } else if (res.message == "Already added ") {
          this.common.presentToast(SecondHeadliner.name + ' is already added to your fans list ...');
        } else {
          ///////////////
        }
      });
    } else {
      this.common.presentToast('Here is no headliner to add as fan');
    }
  }

  toAddThirdUserasFan(event,ThirdHeadliner) {
    console.log('Add User As Fan Button Clicked');
    console.log('ThirdHeadliner:',ThirdHeadliner);
    if (ThirdHeadliner.userid != '') {
      let params  = {
        from : this.userDetails.userid,
        to : ThirdHeadliner.userid,
        category : 'fan'
      }
      console.log('params:',params);
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(ThirdHeadliner.name + ' is added to your fan list');
        } else if (res.message == "Already added ") {
          this.common.presentToast(ThirdHeadliner.name + ' is already added to your fans list ...');
        } else {
          ///////////////
        }
      });
    } else {
      this.common.presentToast('Here is no headliner to add as fan');
    }
  }

  toAddFourthUserasFan(event,FourthHeadliner) {
    console.log('Add User As Fan Button Clicked');
    console.log('FourthHeadliner:',FourthHeadliner);
    if (FourthHeadliner.userid != '') {
      let params  = {
        from : this.userDetails.userid,
        to : FourthHeadliner.userid,
        category : 'fan'
      }
      console.log('params:',params);
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(FourthHeadliner.name + ' is added to your fan list');
        } else if (res.message == "Already added ") {
          this.common.presentToast(FourthHeadliner.name + ' is already added to your fans list ...');
        } else {
          ///////////////
        }
      });
    } else {
      this.common.presentToast('Here is no headliner to add as fan');
    }
  }

  toAddFifthUserasFan(event,FifthHeadliner) {
    console.log('Add User As Fan Button Clicked');
    console.log('FifthHeadliner:',FifthHeadliner);
    if (FifthHeadliner.userid != '') {
      let params  = {
        from : this.userDetails.userid,
        to : FifthHeadliner.userid,
        category : 'fan'
      }
      console.log('params:',params);
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(FifthHeadliner.name + ' is added to your fan list');
        } else if (res.message == "Already added ") {
          this.common.presentToast(FifthHeadliner.name + ' is already added to your fans list ...');
        } else {
          ///////////////
        }
      });
    } else {
      this.common.presentToast('Here is no headliner to add as fan');
    }
  }

  toAddSixthUserasFan(event,SixthHeadliner) {
    console.log('Add User As Fan Button Clicked');
    console.log('SixthHeadliner:',SixthHeadliner);
    if (SixthHeadliner.userid != '') {
      let params  = {
        from : this.userDetails.userid,
        to : SixthHeadliner.userid,
        category : 'fan'
      }
      console.log('params:',params);
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(SixthHeadliner.name + ' is added to your fan list');
        } else if (res.message == "Already added ") {
          this.common.presentToast(SixthHeadliner.name + ' is already added to your fans list ...');
        } else {
          ///////////////
        }
      });
    } else {
      this.common.presentToast('Here is no headliner to add as fan');
    }
  }

}