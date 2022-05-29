import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

  userDetails : any = [];

  constructor(
    public common: CommonService,
    public storageservice: StorageService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   console.log('Entered into Profile Page ');

   this.storageservice.storage.get('userDetails').then((val) => {
    console.log('Storage Value of userDetails:', val);
    this.userDetails = val;
  });
  
  }

  togoBack() {
    console.log('Back Button Clicked');
    this.common.router.navigate(['/tabs/tab6']);
  }

}
