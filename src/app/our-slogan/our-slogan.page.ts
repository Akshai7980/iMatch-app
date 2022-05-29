import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../services/common.service";
import { StorageService } from "./../services/storage.service";
@Component({
  selector: "app-our-slogan",
  templateUrl: "./our-slogan.page.html",
  styleUrls: ["./our-slogan.page.scss"],
})
export class OurSloganPage implements OnInit {
  userDetails: any = [];
  bestieDetails: any = [];
  userSlogan: string;

  constructor(
    public storageservice: StorageService,
    public common: CommonService
  ) {
    this.common.route.queryParams.subscribe((resp: any) => {
      this.bestieDetails = resp;
      console.log("BestiesDetails:", this.bestieDetails);
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.GetStoredUserDetails();
  }

  GetStoredUserDetails() {
    this.storageservice.storage.get("userDetails").then((val) => {
      console.log("Storage Value of userDetails:", val);
      this.userDetails = val;
      this.GetUserSlogan();
    });
  }

  GetUserSlogan() {
    let params = {
      userid: this.userDetails.userid,
      senderid: this.bestieDetails.userid,
    };
    console.log("params:", params);
    this.common.postMethod("GetStatus", params).then(
      (res: any) => {
        console.log("res:", res);
        this.userSlogan = res.details.slogan[0]?.text;
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  SubmitUserSlogan() {
    if (this.userSlogan != "" && this.userSlogan != undefined) {
      let params = {
        userid: this.userDetails.userid,
        category: "slogan",
        text: this.userSlogan,
        send_to: this.bestieDetails.userid,
      };
      console.log("params:", params);
      this.common.postMethod("statusbar", params).then(
        (res: any) => {
          console.log("res:", res);
          if (res.status == true) {
            this.userSlogan = "";
            this.common.presentToast(
              " ✅  Your Our Slogan Content Updated Successfully ..."
            );
            this.common.router.navigate(["besties"], {
              queryParams: this.bestieDetails,
            });
          }
        },
        (err) => {
          console.log("Error:", err);
        }
      );
    } else {
      this.common.showAlert("You cannot send an empty slogan!");
    }
  }
}
