import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-besties-before',
  templateUrl: './besties-before.page.html',
  styleUrls: ['./besties-before.page.scss'],
})
export class BestiesBeforePage implements OnInit {

  userDetails: any = [];
  mybesties: any = [];
  ourStory: any = [];
  ourSlogan: any = [];
  ourLetter: any = [];
  showContent: {[key: number]: boolean} = {};
  Details: any;

  constructor(
    public storageservice: StorageService,
    public common: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.details) {
        this.Details = JSON.parse(params.details);
        console.log('Details:',this.Details);
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.GetStoredUserDetails();
    this.GetStatusContent();
  }

  GetStoredUserDetails () {
    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Stored details of userDetails:', val);
      this.userDetails = val;
      this.GetBestiesList();
    });
  }

  async GetBestiesList () {
    let params = {
      id : this.userDetails.userid
    }
    await this.common.showLoader();
    console.log('params:',params);
    this.common.postMethod('Listbesties',params).then((res:any) => {
     console.log('res:',res);
     this.common.hideLoader();

     this.mybesties = res.details.besties;
     console.log('mybesties',this.mybesties);

     if (this.mybesties.length==0) {
       this.common.presentToast('You are having no `Besties` to show');
       return;
   }
    // else {

    //    this.common.presentToast('You are having '+ res.details.besties.length + ' bestie list members to show');
   
    //  }

    }, err => {

      console.log('Error:',err);

    });
  }

  GetStatusContent () {
    this.ourLetter = [];
    this.ourSlogan = [];
    this.ourStory = [];
  }

  ToRemoveBestie (e, bestie) {
    console.log('Bestie:', bestie);
    let params = {
      userid : this.userDetails.userid,
      besiteid : bestie.tableid
    }
    console.log('params:',params);
    this.common.postMethod('RemoveBesties',params).then((res:any) => {
      console.log('res:',res);
      if (res.status == true) {
        this.GetBestiesList();
        this.common.presentToast( bestie.name + 'is successfully removed from your besties list');
      }
    }, err => {
      console.log('Error:',err);
    });
  }

  ToViewBestiesContent (e, bestie , i, type) {
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
      userid : this.userDetails.userid,
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

  goToBestiesDetails(event,bestie){
    console.log(bestie);
    this.common.navCtrl.navigateForward(['besties'], {queryParams : bestie});
  }

  gotoProfile() {
    this.common.router.navigate(['tabs/tab7']);
  }

  addMoreBesties() {
    console.log('Besties Search page clicked ');
    this.common.navCtrl.navigateForward(['besties-search']);
  }

}
