import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
// import { StorageService } from './../services/storage.service';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import { PopoverController } from '@ionic/angular';
// import { NavParams} from '@ionic/angular';

@Component({
  selector: 'app-search-fans-of',
  templateUrl: './search-fans-of.page.html',
  styleUrls: ['./search-fans-of.page.scss'],
})
export class SearchFansOfPage implements OnInit {

  public searchTerm: string = "";
  public searchControl: FormControl;
  searching: any = false;
  userDetails : any = [];
  public allUsers: any =[];

  constructor(
    // private storageservice: StorageService,
    private common: CommonService,
  ) { 

    this.searchControl = new FormControl();

    // this.storageservice.storage.get('userDetails').then((val) => {
    //   console.log('Storage Value of userDetails:', val);
    //   this.userDetails = val;
    // });

    this.common.route.queryParams.subscribe(resp => {
      this.userDetails = resp;
      console.log('userDetails:',this.userDetails);
  });

  }

  ngOnInit() {

    // this.storage();

    this.setFilteredItems();

    this.searchControl.valueChanges
    .pipe(debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(search => {
      this.searching = false;
      this.searchTerm = search;
      this.setFilteredItems();
    });

  }

  ionViewWillEnter(){
    console.log('in ionViewWillEnter');
  //  this.listAllUsers();

  this.common.showLoader();

  let params = {
    userid : this.userDetails.userid
  }
  console.log('params:',params);  
  this.common.listUsers('Listusers',params).subscribe((res:any) => {
    console.log('res:',res);
    this.allUsers = res.details.name;
    console.log('allUsers:',this.allUsers);
    this.common.hideLoader();
  }, err => {
    console.log('err:',err);
  });

  }

  // async storage() {
  //   this.storageservice.storage.get('userDetails').then((val) => {
  //     console.log('Storage Value of userDetails:', val);
  //     this.userDetails = val;
  //     console.log('userid:',this.userDetails.userid);
  //     if(this.userDetails){
  //       this.common.presentLoading();
  //        this.listAllUsers();
  //       } else{
  //         ////
  //       }
  //   });  

  // }

  // listAllUsers() {

  //   console.log(this.userDetails);  
  //   var userid = this.userDetails["userid"];
  //   let params = {
  //     userid : userid
  //   }
  //   console.log('userid:',params);  
  //   this.common.listUsers('Listusers',params).subscribe((res:any) => {
  //     console.log('res:',res);
  //     this.allUsers = res.details.name;
  //     console.log('allUsers:',this.allUsers);
  //   });

  // }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.allUsers = this.filterItems(this.searchTerm);
  }

  public addToList(event,name,user) {
    
    if( user.userid != '' ) {
      let params = {
        from : this.userDetails.userid,
        to : user.userid,
        category : 'fan_of'
      }
      this.common.postMethod('add_fan',params).then((res:any) => {
        console.log('res:',res);
        if(res.status == true) {
          this.common.presentToast(name + ' is successfully added to your fans of list ...');
          this.common.navCtrl.navigateForward(['fans-of'], {queryParams: this.userDetails});
        } else if (res.message == "Already added ") {
          this.common.presentToast(name + ' is already added to your fans of list ...');
        }
      });
    } else {
      /////
    }

  }

  filterItems(searchTerm) {
    console.log(searchTerm);
    return this.allUsers.filter(user => {
      return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
