import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { CommonService } from './../services/common.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-what-would-i-do',
  templateUrl: './what-would-i-do.page.html',
  styleUrls: ['./what-would-i-do.page.scss'],
})
export class WhatWouldIDoPage implements OnInit {

  FormSubmit : boolean = false;
  userDetails: any = [];
  showTextArea : boolean = false;
  showEditArea : boolean = false;

  public commentForm: FormGroup;
  public answerForm: FormGroup;
  public iQueryForm: FormGroup;

  comment: AbstractControl;
  answer1: AbstractControl;
  answer2: AbstractControl;
  iQuery1: AbstractControl;
  iQuery2: AbstractControl;

  userAnswer = {
    "answer1" : "",
    "answer2" : ""
  }

  userComment = {
    "comment" : ""
  }

  useriQuery = {
    "iQuery1" : "",
    "iQuery2" : ""
  }

  MyiQuery : any;
  Like1: any;
  Like2: any;
  SingleQuery: any;
  AdminQuestions: any = [];
  Answers: any = [];

  constructor(
    public common: CommonService,
    public storageservice: StorageService,
    public formbuilder:FormBuilder,
  ) { 

    this.answerForm = formbuilder.group({
      answer1: ['', Validators.compose([Validators.required,Validators.minLength(2)])],
      answer2: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.commentForm = formbuilder.group({
      comment: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.iQueryForm = formbuilder.group({
      iQuery1: ['', Validators.compose([Validators.required,Validators.minLength(2)])],
      iQuery2: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.answer1 = this.answerForm.controls['answer1'];
    this.answer2 = this.answerForm.controls['answer2'];
    this.comment = this.commentForm.controls['comment'];
    this.iQuery1 = this.iQueryForm.controls['iQuery1'];
    this.iQuery2 = this.iQueryForm.controls['iQuery2'];


    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered into What Would I Do page');

    this.iQueryForm.reset();

    this.storageservice.storage.get('userDetails').then((val) => {
      this.userDetails = val;

      if (this.userDetails.userid != '') {
        let params = {
          userid : this.userDetails.userid,
        }
        console.log('params:',params);
        this.common.postMethod('GetAdminMessage',params).then((res:any) => {
          console.log('res:',res);
          this.AdminQuestions = res.details.adminmessage;
          console.log('AdminQuestions:',this.AdminQuestions);
          this.Answers = res.details.answers;
          console.log('Answers:',this.Answers);
          this.MyiQuery = res.details.MyiQuery;
          this.Like1 = res.details.Like[0];
          this.Like2 = res.details.Like[1];
        });
      }
    });
  }

  toSendComment(event,messages) {
    console.log('Send Button Clicked');
    this.FormSubmit = true;
    console.log('message',messages);
    console.log('FormSubmit:',this.FormSubmit);
    console.log('Value:',this.commentForm.value);
    console.log(this.commentForm.controls['comment']);

      let params = {
        userid : this.userDetails.userid,
        comment : this.userComment.comment,
      }
      console.log('params:',params);
      this.common.postMethod('CommentAnswer',params).then((res:any) => {
        console.log('res:',res);
        if (res.status == true) {
          this.commentForm.reset();
          this.common.presentToast(' ✅ Your comment successfully send');
        } else {
          this.common.presentToast(' 🛑 Something went wrong');
        }
      });

    // } else {
    //   this.common.showAlert('You had reached the maximum count of this week`s iQuery');
    // }


  }

  toSendAnswer(event,AdminQuestions) {
    console.log('Answer 1 Done Button Clicked');
    this.FormSubmit = true;
    console.log('AdminQuestions:',AdminQuestions);
    console.log('FormSubmit:',this.FormSubmit);
    console.log('Value:',this.answerForm.value);
    console.log(this.answerForm.controls['answer1']);

    let params = {
      userid : this.userDetails.userid,
      answer1 : this.userAnswer.answer1,
      answer2 : this.userAnswer.answer2,
      questionnum : AdminQuestions.id
    }
    console.log('params:',params);
    this.common.postMethod('AnswerMessage',params).then((res:any) => {
      console.log('res:',res);
      if (res.status == true) {
        this.ionViewWillEnter();
        this.common.presentToast(' ✅ Your answers successfully send ');
      } else {
        this.common.presentToast(' 🛑 Something went wrong ');
      }
    });
  }

  toLikeAnswer1(event,AdminQuestions) {
    console.log('Like 1 Clicked');
    console.log('AdminQuestions:',AdminQuestions);

    let params = {
      userid : this.userDetails.userid,
      questionid : this.AdminQuestions.id,
      answerid: 'answer1',
      status: 'like'
    }
    console.log('params:',params);
    this.common.postMethod('CommentLike',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });

  }

  toLikeAnswer2(event,AdminQuestions) {
    console.log('Like 2 Clicked');
    console.log('AdminQuestions:',AdminQuestions);
    let params = {
      userid : this.userDetails.userid,
      questionid : this.AdminQuestions.id,
      answerid: 'answer2',
      status: 'like'
    }
    console.log('params:',params);
    this.common.postMethod('CommentLike',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });
  }

  toSendiQuery(event,messages) {
    console.log('iQuery 1 Text Area Clicked');
    this.FormSubmit = true;
    this.showTextArea = false;
    console.log('message',messages);
    console.log('FormSubmit:',this.FormSubmit);
    console.log('Value:',this.iQueryForm.value);
    console.log(this.iQueryForm.controls['iQuery1']);

    if (this.MyiQuery.length!=7 && this.MyiQuery.length>7) {

    let params = {
      userid : this.userDetails.userid,
      query1 : this.useriQuery.iQuery1,
      query2 : this.useriQuery.iQuery2,
      queryid : ''
    }
    console.log('params:',params);
    this.common.postMethod('MyiQuery',params).then((res:any) => {
      console.log('res',res);
      if (res.status == true) {
        this.common.presentToast(' ✅ Your new iQuery successfully added ');
      } else {
        this.common.presentToast(' 🛑 Something went wrong ');
      }
    });
    this.ionViewWillEnter();
  } else {
      this.common.showAlert('You had reached the maximum count of this week`s iQuery, so you cann`t add no more iQuery this week');
  }
  }

  toRemoveiQuery(event,iQuery) {
    console.log('Remove iQuery button clicked');
    let params = {
      queryid : iQuery.queryid
    }
    console.log('params:',params);
    console.log('iQuery:',iQuery);
    this.common.postMethod('RemoveiQuery',params).then((res:any) => {
      console.log('res:',res);
      if (res.status == true) {
        this.ionViewWillEnter();
        this.common.presentToast(' ✅ iQuery successfully removed ');
      } else {
        this.common.presentToast(' 🛑 Something went wrong ');
      }
    });
  }

  toEditiQuery(event,iQuery) {
    console.log('Edit iQuery Button Clicked');
    this.showEditArea = true;
    console.log('iQuery:',iQuery);
    this.SingleQuery = iQuery;
  }

  toSendEditediQuery(event,SingleQuery) {
    console.log('Send Edited iQuery Button Clicked');
    let params = {
      userid : this.userDetails.userid,
      queryid : SingleQuery.queryid,
      query1 : this.useriQuery.iQuery1,
      query2 : this.useriQuery.iQuery2
    }
    console.log('params:',params);
    this.common.postMethod('MyiQuery',params).then((res:any) => {
      console.log('res:',res);
      if (res.status == true) {
        this.ionViewWillEnter();
        this.common.presentToast(' ✅ Your iQuery successfully updated ');
      } else {
        this.common.presentToast(' 🛑 Something went wrong ');
      }
    });
  }

  toCloseEditArea() {
    this.showEditArea = false;
  }

  toShowTextArea() {
    this.showTextArea = true;
  }

}
