import { CommonService } from "./../services/common.service";
import { StorageService } from "./../services/storage.service";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-squad-list",
  templateUrl: "./squad-list.page.html",
  styleUrls: ["./squad-list.page.scss"],
})
export class SquadListPage implements OnInit {
  userDetails: any = [];
  mysquads: any = [];

  constructor(
    public storageservice: StorageService,
    private common: CommonService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.GetStoredUserDetails();
  }

  GetStoredUserDetails() {
    this.storageservice.storage.get("userDetails").then((val) => {
      console.log("Storage Value of userDetails:", val);
      this.userDetails = val;
      this.GetSquadList();
    });
  }

  async GetSquadList() {
    let params = {
      id: this.userDetails.userid,
    };
    console.log("params:", params);
    await this.common.showLoader();
    this.common.postMethod("Listbesties", params).then(
      (res: any) => {
        console.log("res:", res.details);

        this.mysquads = res.details.squad;
        this.common.hideLoader();
        console.log("mysquads", this.mysquads);

        if (this.mysquads.length == 0) {
          this.common.presentToast("You are having no `Squads` to show");
        } else {
          this.common.presentToast(
            "You are having " +
              res.details.squad.length +
              " squad list members to show"
          );
        }
      },
      (err) => {
        this.common.hideLoader();
        console.log("Error:", err);
      }
    );
  }

  ToLikeSquadList() {
    let params = {
      userid: this.userDetails.userid
    }
    console.log('params:',params);
    this.common.postMethod('abc',params).then((res:any) => {
      console.log('res:',res);
    }, err => {
      console.log('Error:',err);
    });
  }

  ToUserSearch() {
    this.common.navCtrl.navigateForward(["squad-search"], {queryParams: this.userDetails.userid});
  }
}
