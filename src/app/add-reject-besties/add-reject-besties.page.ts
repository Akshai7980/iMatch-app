import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "./../services/common.service";
import { StorageService } from "./../services/storage.service";
@Component({
  selector: "app-add-reject-besties",
  templateUrl: "./add-reject-besties.page.html",
  styleUrls: ["./add-reject-besties.page.scss"],
})
export class AddRejectBestiesPage implements OnInit {
  BestiesInvitaion: any = [];
  // userDetails: any = [];
  UserId: any;
  userDetails: any = [];
  NotificationDetails: any = [];

  constructor(
    public storageservice: StorageService,
    private route: ActivatedRoute,
    public common: CommonService,
    private router: Router
  ) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userDetails = this.router.getCurrentNavigation().extras.state.details;
        this.NotificationDetails = this.router.getCurrentNavigation().extras.state.notification;
          console.log('userDetails',this.userDetails);
          console.log('NotificationDetails',JSON.parse(this.NotificationDetails));
      }
    });
  }

  ngOnInit() {
    // this.common.route.queryParams.subscribe(async resp => {
    //   this.UserId = resp;
    //   console.log('UserId',this.UserId);
    //   this.GetBestieInvitations();
    // });


  }

  ionViewWillEnter() {
    // this.GetStoredUserDetails();

    this.BestiesInvitaion = [
      {
        name: "Ravi",
      },
      {
        name: "Balu",
      },
      {
        name: "Ravi",
      },
      {
        name: "Balu",
      },
      {
        name: "Ravi",
      },
      {
        name: "Balu",
      },
      {
        name: "Ravi",
      },
      {
        name: "Balu",
      },
    ];
  }

  // GetStoredUserDetails() {
  //   this.storageservice.storage.get("userDetails").then((val) => {
  //     console.log("Storage Value of userDetails:", val);
  //     this.userDetails = val;
  //   });
  // }

  GetBestieInvitations() {
    let params = {
      userid: this.UserId,
    };
    console.log("params:", params);
    this.common.postMethod("abc", params).then(
      (res: any) => {
        console.log("res:", res);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  ViewUserProfile(e, invitaion, i) {
    let params = {
      userid: this.UserId,
    };
    console.log("params:", params);
    this.common.postMethod("abc", params).then(
      (res: any) => {
        console.log("res:", res);
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  AddAsBestie(e, invitaion, i) {
    let params = {
      request_id: '',
      status : 'accept'
    };
    console.log("params:", params);
    this.common.postMethod("accept_or_reject", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status === true) {
          this.GetBestieInvitations();
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  RejectBestieInvitation(e, invitaion, i) {
    let params = {
      request_id: '',
      status : 'reject'
    };
    console.log("params:", params);
    this.common.postMethod("accept_or_reject", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status === true) {
          this.GetBestieInvitations();
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  BlockTheUser(e, invitaion, i) {
    let params = {
      request_id: '',
      status : 'block'
    };
    console.log("params:", params);
    this.common.postMethod("abc", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status === true) {
          this.GetBestieInvitations();
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }
}
