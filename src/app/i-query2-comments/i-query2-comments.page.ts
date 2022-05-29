import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-i-query2-comments',
  templateUrl: './i-query2-comments.page.html',
  styleUrls: ['./i-query2-comments.page.scss'],
})
export class IQuery2CommentsPage implements OnInit {

  FormSubmit : boolean = false;
  userDetails: any = [];
  QueryDetails: any = [];
  commentDetails: any = [];

  public iQueryCommentForm: FormGroup;

  comment: AbstractControl;

  userComment = {
    "comment" : ""
  }

  constructor(
    public storageservice: StorageService,
    private common: CommonService,
    public formbuilder: FormBuilder,
  ) { 

    this.iQueryCommentForm = formbuilder.group({
      comment: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.comment = this.iQueryCommentForm.controls['comment'];

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.QueryDetails = resp;
      console.log('QueryDetails for comment page:',this.QueryDetails);
  });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('Entered into iQuery Comment Page');
     let params = {
       queryid: this.QueryDetails.queryid
     }
     console.log('params:',params);
     this.common.postMethod('GetMyiQueryComment',params).then((res:any) => {
       console.log('res:',res);
       this.commentDetails = res.details.query2;
     });
   }

   toAddComment() {
    console.log('Send iQuery Comment Button Clicked');
    let params = {
      userid : this.userDetails.userid,
      queryid : this.QueryDetails.queryid,
      querynum : 'query2',
      comment : this.userComment.comment
    }
    console.log('params:',params);
    this.common.postMethod('Iquerycomment',params).then((res:any) => {
      console.log('res:',res);
      this.ionViewWillEnter();
    });
  }

}
