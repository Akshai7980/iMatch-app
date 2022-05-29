import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-squad-search',
  templateUrl: './squad-search.page.html',
  styleUrls: ['./squad-search.page.scss'],
})
export class SquadSearchPage implements OnInit {

  public searchControl: FormControl;
  public searchTerm: string = "";
  searching: any = false;
  userDetails : any = [];
  userid : {};
  public allUsers: any =[];
  public user_id: string;

  constructor(
    private storageservice: StorageService,
    private common: CommonService,
  ) { 
    this.searchControl = new FormControl();

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
      console.log('userid:',this.userDetails.userid);
      this.user_id = this.userDetails.userid
    });

  }

  ionViewWillEnter(){
    this.listAllUsers();
  }

  ngOnInit() {
    this.storage();

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

  async storage() {
    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
      console.log('userid:',this.userDetails.userid);
      this.user_id = this.userDetails.userid;
      if(this.userDetails){
        this.common.presentLoading();
         this.listAllUsers();
        } else{
          ////
        }
    });  

  }

  listAllUsers() {
    console.log(this.userDetails);
    var userid = this.userDetails["userid"];
    let params = {
      userid : userid
    }
    console.log('userid:',params);
    this.common.listUsers('Listusers',params).subscribe((res:any) => {
      console.log('res:',res);
      this.allUsers = res.details.name;
      console.log('allUsers:',this.allUsers);
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.allUsers = this.filterItems(this.searchTerm);
  }

  public addToList(event,name,user) {
    console.log('Clicked add button');
    console.log('name:', name);
    console.log('My userid:',this.userDetails.userid);
    console.log('Besty userid:', user.userid);
    console.log(user);
    // this.common.presentToast(name +' is added to your besties list ...');
    if( user.userid != '' ) {
      let params = {
        from : this.userDetails.userid,
        to : user.userid,
        category : 'squad'
      }
      this.common.postMethod('add_bestie',params).then((res:any) => {
        console.log('res:',res);
        if(res.message == "Successfully added to squadlist") {
          this.common.router.navigate(['/squad-list']);
          this.common.presentToast(name + ' is successfully added to your squad list ...');
        } else if (res.message == "Already added ") {
          this.common.presentToast(name + ' is already in your squad list ...');
        }
      });
    } else {

    }

  }

  filterItems(searchTerm) {
    console.log(searchTerm);
    return this.allUsers.filter(user => {
      return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
