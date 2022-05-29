import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  ChatEndColors = [
    {
      first : '#F11A06'
    },
    {
      second : '#FCBB39'
    },
    {
      third : '#6E6E70'
    }
  ]

  userDetails: any;
  chatList: any = [];

  constructor(
    public storageservice: StorageService,
    private common: CommonService,
    ) { 

      this.storageservice.storage.get('userDetails').then((val) => {
        console.log('Storage Value of userDetails:', val);
        this.userDetails = val;
      });

    }

  ngOnInit() {

    console.log('Colors:',this.ChatEndColors);
  }

  gotoProfile() {
    console.log('Profile Clicked');
    this.common.navCtrl.navigateForward(['tabs/tab7'], {queryParams: this.userDetails});
  }

  openMessage(event,chat,i) {
    console.log('chat:',chat);
    console.log('i:',i);
    chat.OpponentId = this.userDetails.userid;
    this.common.router.navigate(['/chat-message'], {queryParams: chat});
  }

  ionViewWillEnter(){
   console.log('Entered into Chat page');

   this.storageservice.storage.get('userDetails').then((val) => {
    this.userDetails = val;

    if(this.userDetails.userid != '') {

      let params = {
        userid : this.userDetails.userid,
      }
      console.log('params:',params);
      this.common.postMethod('GetChat',params).then((res:any) => {
        console.log('res:',res);
        this.chatList = res.details;

        // var chatA = new Date(this.chatList[0].send_at);
        // var chatB = new Date(this.chatList[5].send_at);

        // this.chatList = this.chatList.sort((chatA, chatB) => {
        //   return chatB.send_at - chatA.send_at;
        // });
      });

    } else {
      /////////////////////////
    }
  });


  }

  gotoNewMessage() {
    this.common.router.navigate(['/search-chat-user']);
  }

}
