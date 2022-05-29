import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-open-match-comments',
  templateUrl: './open-match-comments.page.html',
  styleUrls: ['./open-match-comments.page.scss'],
})
export class OpenMatchCommentsPage implements OnInit {

  FormSubmit : boolean = false;
  userDetails: any = [];
  MatchDetails: any = [];
  CommentDetails: any = [];

  public OpenMatchCommentForm: FormGroup;
  comment: AbstractControl;

  userComment = {
    "comment" : ""
  }

  constructor(
    public storageservice: StorageService,
    private common: CommonService,
    public formbuilder: FormBuilder,
  ) {

    this.OpenMatchCommentForm = formbuilder.group({
      comment: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.comment = this.OpenMatchCommentForm.controls['comment'];

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.MatchDetails = resp;
      console.log('MatchDetails:',this.MatchDetails);
  });

   }

  ngOnInit() {
  }

  ionViewWillEnter(){

    console.log('Entered into Open Match Comment Page');
    let params = {
      userid: 0,
      matchid : this.MatchDetails.match_id,
    }
    console.log('params:',params);
    this.common.postMethod('GetComment',params).then((res:any) => {
      console.log('res:',res);
      this.CommentDetails = res.details;
    }, (err) => {
      console.log('Error:',err);
      console.log(err.headers);
      this.ionViewWillEnter();
    });

  }

  toAddComment() {
    console.log('Send Open Match Comment Button Clicked');
    let params = {
      userid : this.userDetails.userid,
      matchid : this.MatchDetails.match_id,
      comment : this.userComment.comment,
      contestentid : ''
    }
    console.log('params:',params);
    this.common.postMethod('Comment',params).then((res:any) => {
      console.log('res:',res);
      this.OpenMatchCommentForm.reset();
      this.ionViewWillEnter();
    }, (err) => {
      console.log('Error:',err);
      console.log(err.headers);
    });
  }

}
