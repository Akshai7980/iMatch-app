import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { NavParams} from '@ionic/angular';

@Component({
  selector: 'app-besties-search',
  templateUrl: './besties-search.page.html',
  styleUrls: ['./besties-search.page.scss'],
})
export class BestiesSearchPage implements OnInit {

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
      this.common.postMethod('Listusers',params).then((res:any) => {
        console.log('res:',res);
        this.allUsers = res.details.name;
        console.log('allUsers:',this.allUsers);
      });
    }

  onSearchInput(e) {
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
        category : 'bestie'
      }
      this.common.postMethod('add_bestie',params).then((res:any) => {
        console.log('res:',res);
        if(res.message == "Successfully added as Bestie") {
          this.common.presentToast(name + ' is successfully added to your besties list ...');
          this.common.navCtrl.navigateForward(['besties'],{queryParams: user});
        } else if (res.message == "Already added ") {
          this.common.presentToast(name + ' is already added to your besties list ...');
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

  //   async presentPopover(ev:any,user) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     componentProps:{key:ev,id:this.userDetails},
  //     event: ev,
  //     translucent: true,
  //     animated: false
  //   });
  //     console.log('event',ev);
  //   console.log('user:',user);
  //   return await popover.present();
  // }
}

@Component({
  template: `
        <ion-list mode="ios">
            <ion-item (click)="onDismiss('bestie')">Add to Bestie</ion-item>
            <ion-item (click)="onDismiss('squad')">Add to Squad</ion-item>
            <ion-item (click)="onDismiss('fan')">Add to Fan</ion-item>
            <ion-item (click)="onDismiss('')">Add to Fans Of</ion-item>
            <ion-item (click)="onDismiss('match')">Invite for Match</ion-item>
        </ion-list>
    `
})

export class PopoverComponent {

  User: any = [];
  userdetails: any = [];

  constructor(
    public popoverController: PopoverController,
    private common: CommonService,
    public navParams: NavParams
    ) {

        // this.storageservice.storage.get('userDetails').then((val) => {
        // console.log('Storage Value of userDetails:', val);
        // this.userDetails = val;

      console.log(this.navParams.get('key'));
            console.log('my userid:',this.navParams.get('id'));
            this.userdetails = this.navParams.get('key');
      this.User = this.navParams.get('key');
      console.log('users in popover:',this.User);

    }

  async onDismiss(value) {
    try {
    
      this.popoverController.dismiss(value);
      if(value=='bestie'){
        console.log('Bestie Clicked');
        let params = {
          // from : userdetails.userid,
          // to : ,
          category : 'bestie'
        }
          // this.common.router.navigate(['/profile']); 
      } else if (value=='squad') {
        console.log('Squad Clicked');
            // this.common.router.navigate(['/besties']); 
      } else if (value=='fan') {
        console.log('Fan Clicked');
            // this.common.router.navigate(['/squad-list']);
      } else if (value=='') {
        console.log('Fans Of Clicked');
            // this.common.router.navigate(['/fans-of']);
      } else if (value=='match') {
        console.log('Match Clicked');
        // this.common.navCtrl.navigateForward(['/tabs/tab1']);
      }
      
    } catch (e) {
      console.log(e);
        //click more than one time popover throws error, so ignore...
    }

  }

}