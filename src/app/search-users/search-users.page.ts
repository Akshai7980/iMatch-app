import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
// import { StorageService } from './../services/storage.service';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
})
export class SearchUsersPage implements OnInit {

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

  async ionViewWillEnter(){
    console.log('in ionViewWillEnter');

    await this.common.showLoader();

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
      this.common.hideLoader();
      console.log('err:',err);
    });

  //  this.listAllUsers();
  }

  // async storage() {

  //   // this.storageservice.storage.get('userDetails').then((val) => {
  //     // console.log('Storage Value of userDetails:', val);
  //     // this.userDetails = val;
  //     // console.log('userid:',this.userDetails.userid);
  //     if(this.userDetails.userid!=''){
  //       this.common.presentLoading();
  //        this.listAllUsers();
  //       } else{
  //         ////
  //       }
  //   // });  

  // }

  // listAllUsers() {

  //   // console.log(this.userDetails);  
  //   // var userid = this.userDetails["userid"];
  //   let params = {
  //     userid : this.userDetails.userid
  //   }
  //   console.log('params:',params);  
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

  filterItems(searchTerm) {
    console.log(searchTerm);
    return this.allUsers.filter(user => {
      return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  gotoVisitorsActivity(event,user){
    console.log('Entered Into Visitors Activity Page');
    console.log('user:',user);
    this.common.navCtrl.navigateForward(['/visitors-view-activity'], {queryParams: user});
  }

}