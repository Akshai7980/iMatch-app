import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common.service';

@Component({
  selector: 'app-what-would-i-do-visitor',
  templateUrl: './what-would-i-do-visitor.page.html',
  styleUrls: ['./what-would-i-do-visitor.page.scss'],
})
export class WhatWouldIDoVisitorPage implements OnInit {

  userArray: any = [];
  message: any;
  answers: any;
  MyiQuery: any;
  showCommentBox: boolean = false;

  constructor(
    public common: CommonService,
  ) { 
    this.common.route.queryParams.subscribe((resp:any) => {
      this.userArray = resp;
      console.log('userArray:',this.userArray);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered into What Would I Do If Visitors page');

      let params = {
        userid : this.userArray.userid,
      }
      console.log('params:',params);
      this.common.postMethod('GetAdminMessage',params).then((res:any) => {
        console.log('res:',res);
        this.message = res.details.adminmessage;
        this.answers = res.details.answers;
        this.MyiQuery = res.details.MyiQuery;
        console.log('MyiQuery:',this.MyiQuery);
      });
  }

  toCommentiQuery1(event,Query) {
    console.log('Comment iQuery 1 Clicked');
    console.log('Query:',Query);
    this.common.navCtrl.navigateForward(['/i-query-comments'],{queryParams: Query});
  }

  toCommentiQuery2(event,Query) {
    console.log('Comment iQuery 2 Clicked');
    console.log('Query:',Query);
    this.common.navCtrl.navigateForward(['/i-query2-comments'],{queryParams: Query});
  }

  toLikeiQuery1(event,Query) {
    console.log('Like iQuery 1 Clicked');
    let params = {
      userid : this.userArray.userid,
      queryid : Query.queryid,
      querynum : 'query1',
      status : 'like'
    }
    console.log('params:',params);
    console.log('Query:',Query);
    this.common.postMethod('Myiquerylike',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });
  }

  toLikeiQuery2(event,Query) {
    console.log('Like iQuery 2 Clicked');
    let params = {
      userid : this.userArray.userid,
      queryid : Query.queryid,
      querynum :'query2',
      status : 'like'
    }
    console.log('params:',params);
    console.log('Query:',Query);
    this.common.postMethod('Myiquerylike',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });
  }


}