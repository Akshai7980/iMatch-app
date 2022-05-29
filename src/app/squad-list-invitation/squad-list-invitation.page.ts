import { Component, OnInit } from '@angular/core';
import { CommonService } from "./../services/common.service";
import { StorageService } from "./../services/storage.service";

@Component({
  selector: 'app-squad-list-invitation',
  templateUrl: './squad-list-invitation.page.html',
  styleUrls: ['./squad-list-invitation.page.scss'],
})
export class SquadListInvitationPage implements OnInit {

  SquadListInvitaion: any = [];
  userDetails: any = [];

  constructor(
    public storageservice: StorageService,
    public common: CommonService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.GetStoredUserDetails();

    this.SquadListInvitaion = [
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

  GetStoredUserDetails() {
    this.storageservice.storage.get("userDetails").then((val) => {
      console.log("Storage Value of userDetails:", val);
      this.userDetails = val;
      this.GetSquadListInvitations();
    });
  }

  GetSquadListInvitations() {
    let params = {
      userid: this.userDetails.userid,
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
      userid: this.userDetails.userid,
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

  AddToSquadList(e, invitaion, i) {
    let params = {
      request_id: '',
      status : 'accept'
    };
    console.log("params:", params);
    this.common.postMethod("accept_or_reject", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status === true) {
          this.GetSquadListInvitations();
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  RejectSquadListInvitation(e, invitaion, i) {
    let params = {
      request_id: '',
      status : 'reject'
    };
    console.log("params:", params);
    this.common.postMethod("accept_or_reject", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status === true) {
          this.GetSquadListInvitations();
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
          this.GetSquadListInvitations();
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

}
