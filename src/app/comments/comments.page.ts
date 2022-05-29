import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  FormSubmit : boolean = false;
  userDetails: any = [];
  matchDetails: any = [];
  commentDetails: any = [];

  public OpenMatchCommentForm: FormGroup;
  public ReplyCommentForm: FormGroup;

  comment: AbstractControl;
  reply: AbstractControl;

  userComment = {
    "comment" : ""
  }

  userReply = {
    "reply" : ""
  }

  doReply: boolean = false;
  ReplyArray: any;
  ReplyComments: any = [];
  showReplyComment: {[key: number]: boolean} = {};
  commentId: any;
  ReplyCommentArray: any = [];

  constructor(
    public storageservice: StorageService,
    private common: CommonService,
    public formbuilder: FormBuilder,
  ) 
  {

    this.OpenMatchCommentForm = formbuilder.group({
      comment: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.ReplyCommentForm = formbuilder.group({
      reply: ['', Validators.compose([Validators.required,Validators.minLength(2)])]
    });

    this.comment = this.OpenMatchCommentForm.controls['comment'];

    this.reply = this.ReplyCommentForm.controls['reply'];

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe(resp => {
      this.matchDetails = resp;
      console.log('matchDetails for comment page:',this.matchDetails);
  });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){

    if (this.matchDetails.matchType === 'PERSONAL' || this.matchDetails.matchType === 'ONGOING') {
      let params = {
        userid : '0',
        matchid : this.matchDetails.match_id
      }
      console.log('params:',params);
      this.common.postMethod('GetComment',params).then((res:any) => {
        console.log('res:',res);
        this.commentDetails = res.details;
        this.ReplyComments = res.reply_comment;

      }, err => {
        console.log('Error:',err);
      })
    } else {
      this.storageservice.storage.get('userDetails').then((val) => {
        this.userDetails = val;
  
        if (this.userDetails.userid != '') {
  
          let params = {
            userid : this.userDetails.userid,
            matchid : this.matchDetails.match_id
          }
  
          console.log('params:',params);
          this.common.postMethod('GetComment',params).then((res:any) => {
            console.log('res:',res);
            this.commentDetails = res.details;
            this.ReplyComments = res.reply_comment;
            // if (this.commentDetails.replied_comment != "0") {
            //   this.ReplyComments = res.details;
            //   console.log('ReplyComments:',this.ReplyComments);
            // } else {
            //   this.common.presentToast(' 🛑 Something went wrong !!! ');
            // }
          });
        }
      });
    }

  }

  toAddComment() {
    console.log('Add Comment Button Clicked');
    if (this.OpenMatchCommentForm.valid && this.matchDetails.match_status=='1') {

      let params = {
        userid : this.userDetails.userid,
        matchid : this.matchDetails.match_id,
        comment : this.userComment.comment,
        contestentid : '0'
      }
      console.log('params:',params);
      this.common.postMethod('Comment',params).then((res:any) => {
        console.log('res:',res);
        if (res.status == true) {
          this.OpenMatchCommentForm.reset();
          this.ionViewWillEnter();
        } else {
          this.common.presentToast(' 🛑 Something went wrong !!! ');
        }
      }, (err) => {
        console.log('Error:',err);
        this.common.presentToast(' 🛑 A Network error occured ...');
      });

    } else {

      this.OpenMatchCommentForm.reset();
      this.common.presentToast('The match you are trying to comment is got finished, so you cann`t comment here' );
    
    }

  }

  toLikeComment(e,comment) {
    console.log('Comment Like Button clicked');
    console.log('comment:',comment);
    let params = {
      commentid: comment.id,
      userid: this.userDetails.userid,
    }
    console.log('params:',params);
    this.common.postMethod('MatchCommentLike',params).then((res:any )=> {
      console.log('res',res);
      if(res.status == true) {
        this.ionViewWillEnter();
      } else{
        this.common.presentToast(' 🛑 Something went wrong !!! ');
      }
    }, (err) => {
      console.log('Error',err);
      this.common.presentToast(' 🛑 A Network error occured ...');
    });
  }

  toLikeReplyComment(e,comment) {
    console.log('Reply Comment Like Button Clicked');
    console.log('comment:',comment);
    let params = {
      commentid: comment.id,
      userid : this.userDetails.userid,
    }
    console.log('params:',params);
    this.common.postMethod('MatchCommentLike',params).then((res:any )=> {
      console.log('res:',res);
      if (res.status == true) {
        this.ionViewWillEnter();
      } else {
        this.common.presentToast(' 🛑 Something went wrong !!! ');
      }
    }, (err) => {
      console.log('Error:',err);
    });
  }

  toShowReplyField(e,comment) {
    console.log('e:',e);
    console.log('comment:',comment);
    this.doReply = true;
    this.ReplyArray = comment;
  }

  toAddReply(e,ReplyArray) {
    console.log('Send Reply Button clicked');
    console.log('ReplyArray:',ReplyArray);

    if (this.ReplyCommentForm.valid) {

      let params = {
        userid: this.userDetails.userid,
        matchid: this.matchDetails.match_id,
        comment: this.userReply.reply,
        contestentid: '0',
        replied_commentid: ReplyArray.id,
      }

      console.log('params:',params);
      this.common.postMethod('ReplyComment',params).then((res:any) => {
        console.log('res:',res);
        if (res.status == true) {
          this.OpenMatchCommentForm.reset();
          this.ReplyCommentForm.reset();
          this.ionViewWillEnter();
        } else {
          this.common.presentToast(' 🛑 Something went wrong !!! ');
        }
      }, (err) => {
        console.log('Error',err);
      });

    } else {
      this.common.presentToast('Cannot Send Empty Messages ...');
    }

  }

  toShowReplyComment(e, comment , i:number) {
    console.log('To Show Reply Comment Clicked',i);
    this.ReplyCommentArray = [];
    console.log('comment:', comment, 'id:',comment.id);
    this.commentId = comment.id;
    this.showReplyComment[i] = true;
    console.log('ReplyComments:',this.ReplyComments);
    if (this.ReplyComments?.length!=0) {
        for (let i=0; i<this.ReplyComments.length; i++) {
          const includesCommentId = this.ReplyComments[i].replied_comment.includes(this.commentId);
          console.log('includesCommentId:',includesCommentId);
          if (includesCommentId===true) {
            this.ReplyCommentArray.push(this.ReplyComments[i]);
              console.log('ReplyCommentArray:', this.ReplyCommentArray);
          } else {
            this.showReplyComment[i] = false;
          }
        }
    } else {
      console.log('ReplyComments empty');
      this.showReplyComment[i] = false;
      this.common.presentToast(comment.commented_username + ' comment have no reply comments to display');
    }

  }

  toHideReplyComment(e, comment, i:number) {
    console.log('comment:', comment, i);
    this.showReplyComment[i] = false;
  }

}
