import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';

@Component({
  selector: 'app-search-chat-user',
  templateUrl: './search-chat-user.page.html',
  styleUrls: ['./search-chat-user.page.scss'],
})
export class SearchChatUserPage implements OnInit {

  public searchTerm: string = "";
  public searchControl: FormControl;
  searching: any = false;
  userDetails : any = [];
  public allUsers: any =[];
  bestieDetails: any;

  constructor(
    private storageservice: StorageService,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private common: CommonService,
  ) {
    this.searchControl = new FormControl();

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });
   }

  ionViewWillEnter(){
    console.log('in ionViewWillEnter');
   this.listAllUsers();
  }

  ionViewDidEnter(){
    this.storageservice.storage.get('bestieDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.bestieDetails = val;
    });
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
      // this.user_id = this.userDetails.userid;
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
    })
  }

  onSearchInput() {
    this.searching = true;
  }


  setFilteredItems() {
    this.allUsers = this.filterItems(this.searchTerm);
  }

  public addToChatRoom(event,name,user) {
        if(user != undefined) {
          console.log('user:',user);
          this.common.presentToast(name + ' is successfully added to your Chat list ...');
          this.common.router.navigate(['/chat-message'],{queryParams: user});
        } else {
          this.common.presentToast('Something went wrong!');
        }
  }

  filterItems(searchTerm) {
    console.log(searchTerm);
    return this.allUsers.filter(user => {
      return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
