import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { CommonService } from './../services/common.service';

@Component({
  selector: 'app-besties-actions',
  templateUrl: './besties-actions.page.html',
  styleUrls: ['./besties-actions.page.scss'],
})
export class BestiesActionsPage implements OnInit {

  userDetails: any = [];
  BestiesAction: any = [];

  constructor(
    public common: CommonService,
    public storageservice: StorageService,
  ) { 

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
   console.log('Entered into Besties Action Page');

   this.storageservice.storage.get('userDetails').then((val) => {
     this.userDetails = val;

      if (this.userDetails.userid != '') {

        let params = {
          userid : this.userDetails.userid
        }

        console.log('params:', params);
        this.common.postMethod('BestieAction',params).then((res:any) => {
         console.log('res:',res);

         this.BestiesAction = res.details;

        });

      }
      
   });

  }

}
