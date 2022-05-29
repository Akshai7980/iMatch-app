import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonService } from './../services/common.service';
import { ActionSheetController, IonSlides } from '@ionic/angular';
import { FormBuilder,	FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, CameraPhoto, Capacitor, PhotosAlbumType, FilesystemEncoding } from '@capacitor/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {

  showUploadSection = false;
  FormSubmit : boolean = false;
  // isLink: boolean = false;
  isLink:  {[key: number]: boolean} = {};
  // hideImageSpace: boolean = true;
  hideImageSpace: {[key: number]: boolean} = {};

  userDetails: any = [];
  invitationDetails: any = [];
  invite: any = [];
  MatchFiles: any = [];
  ImageDetails: any = [];
  statusId: any ;

  public LinkInputForm: FormGroup;
  link: AbstractControl;
  InvitationWording: string;

  userLink = {
    "link": ""
  }

  // @ViewChild('slides', {static: true}) slides: IonSlides;
  personalMatchSlideIndex: any;
  FileTransferResponse: any = [];
  isWording: {[key: number]: boolean} = {};
  isVideo: {[key: number]: boolean} = {};
  isAudio: {[key: number]: boolean} = {};
  isImage: {[key: number]: boolean} = {};
  Links: any;
  // isImage: boolean = false;
  // isAudio: boolean = false;
  // isVideo: boolean = false;

  constructor(
    public storageservice: StorageService,
    public actionSheetController: ActionSheetController,
    public common: CommonService,
    public formbuilder: FormBuilder,
    private mediaCapture: MediaCapture,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private filePath: FilePath,
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
    this.LinkInputForm = formbuilder.group({
      link : ['', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(7),
                                      Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')
                                        ])]
   });

   this.link = this.LinkInputForm.controls['link'];

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });

    this.common.route.queryParams.subscribe((resp:any) => {
      this.userDetails = resp;
      this.personalMatchSlideIndex = this.userDetails.personalMatchSlideIndex;
      console.log('userArray:',this.userDetails);
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userDetails = this.router.getCurrentNavigation().extras.state.details;
        this.invitationDetails = this.router.getCurrentNavigation().extras.state.invitations;
          console.log('userDetails',JSON.parse(this.userDetails));
          console.log('NotificationDetails',JSON.parse(this.invitationDetails));
      }
    });

   }

  ngOnInit() {
  }

  // ionViewWillEnter(){

  //   console.log('Entered into Invitation page','FileTransferResponse:',this.FileTransferResponse, 'statusId:',this.statusId);
  //   console.log('isImage:',this.isImage,'isAudio:',this.isAudio,'isVideo:',this.isVideo);
  //   console.log('isLink:',this.isLink,'hideImageSpace:',this.hideImageSpace,'isWording:',this.isWording);

  //   this.common.showLoader();
  //   this.storageservice.storage.get('userDetails').then((val) => {
  //     this.userDetails = val ;

  //     if ( this.userDetails.userid != '' ) {

  //   const params = {
  //     userid : this.userDetails.userid
  //   };

  //   console.log('params:', params);
  //   this.common.postMethod('AllInvitation', params).then(async (res: any) => {
  //     console.log('res:', res);
  //     this.invitationDetails = res.details;
  //     this.MatchFiles = res.details.files;
  //     console.log('invitationDetails:', this.invitationDetails);
  //     for (let i = 0; i < this.invitationDetails.length; i++) {
  //         this.hideImageSpace[i] = true;
  //     }

  //     await this.common.hideLoader();

  //   }, async err => {
      
  //     await this.common.hideLoader();
  //     console.log('Error:', err);
  //   });

  //   } else {
  //     console.log('userid empty');
  //   }

  //   });

  // }

  openUploadSection(e,invite) {
    this.showUploadSection = !this.showUploadSection;
    console.log('Open upload section clicked');
    console.log(invite);

  }

  closeUploadSection(e, invite, i) {
    this.showUploadSection = false;
    console.log('No thanks clicked');
    console.log(invite);

    let params = {
      request_id : invite.match_id,
      status : 'reject'
    }

    console.log('params:',params);
    this.common.postMethod('Match_reply',params).then((res:any) => {
      console.log('res:',res);

      if (res.status == true) {
        this.RefreshInvitaionList(i);
        this.common.presentToast('You had rejected ' + invite.sender_name + '`s match ');
        // this.common.navCtrl.navigateForward(['tabs/tab5'], {queryParams: this.userDetails});
      } else {
        this.common.presentToast('You had already replied to '+ invite.sender_name + '`s invitation ');
      }

    });

  }

  RefreshInvitaionList (i:number) {
    console.log('Refreshing Invitaion List ...');
    this.FileTransferResponse = [];
    this.hideImageSpace[i] = true;
    this.isImage[i] = false;
    this.isAudio[i] = false;
    this.isVideo[i] = false;
    this.isLink[i] = false;
    this.isWording[i] = false;
    console.log('FileTransferResponse:', this.FileTransferResponse, 'statusId:', 
    this.statusId, 'isImage:', this.isImage, 'isAudio:', this.isAudio, 'isVideo:', 
    this.isVideo, 'isLink:', this.isLink, 'hideImageSpace:', this.hideImageSpace, 'isWording:', this.isWording);
    let params = {
      userid : this.userDetails.userid
    }
    console.log('params:',params);
    this.common.postMethod('AllInvitation',params).then((res:any) => {
      console.log('res:',res);
      this.invitationDetails = res.details;
      console.log('invitationDetails:',this.invitationDetails);
    }, err => {
      console.log('Error:',err);
    });
  }

  acceptInvitation(e, invite, i) {

    console.log('Bring it on clicked');
    console.log(invite);

    if (this.isLink[i]==true) {

      if (this.LinkInputForm.valid) {

        const regex  = '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)';

        if (this.userLink.link.match(regex)!=null) {
  
          console.log('Matching link');
            this.userLink.link = this.userLink.link;
              console.log('link1',this.userLink.link);
  
        } else {
  
          console.log('No Match');
            this.userLink.link = 'https://'+this.userLink.link;
              console.log('link1',this.userLink.link);
  
        }
  
        let params = {
          text : this.userLink.link,
          filetype : 'link',
          userid : this.userDetails.userid,
          matchid : this.invite.match_id,
        }
        console.log('params:',params);
        this.common.postMethod('MatchUpload',params).then((res:any) => {
          console.log('res:',res);
          this.statusId = res.details.uploaded_id;
          if (res.status===true) {
            this.BringItOn();
            console.log('BringItOn function working ...');
          } else {
            console.log('Else part working ....');
          }
        }, err => {
          console.log('Error:',err);
        });

      } else {

        this.common.showAlert('Please enter any link for Link Match');

      }

    } else if (this.isWording[i]==true) {

      if (this.InvitationWording!=undefined) {

        let params = {
          text : this.InvitationWording,
          filetype : 'text',
          userid : this.userDetails.userid,
          matchid : this.invite.match_id,
        }
        console.log('params:',params);
        this.common.postMethod('MatchUpload',params).then((res:any) => {
          console.log('res:',res);
          this.statusId = res.details.uploaded_id;
          if (res.status===true) {
            this.BringItOn();
            console.log('BringItOn function working ...');
          } else {
            console.log('Else part working ....');
          }
        }, err => {
          console.log('Error:',err);
        });

      } else {

        this.common.showAlert('Please enter any content for Wording Match');

      }

    } else if (this.hideImageSpace[i]==true) {

        this.BringItOn();

    }

    // if (this.LinkInputForm.valid) {
    //   this.toSubmitLinkField();
    // } else {
    //   console.log('isLink is false');
    // }

    // if (this.isWording[i]===true) {
    //   this.toSubmitWordingField();
    // } else  {
    //   console.log('isWording is false');
    // }

    // if (this.LinkInputForm.valid || this.ImageDetails!='') {

    //   let params = {
    //     request_id : invite.match_id,
    //     status : 'accept'
    //   }
  
    //   console.log('params:',params);
    //   this.common.postMethod('Match_reply',params).then((res:any) => {
    //     console.log('res:',res);
  
    //     if (res.status == true) {
    //       this.ionViewWillEnter();
    //       this.common.router.navigate(['/tabs/tab2']);
    //       this.common.presentToast('You had successfully accepted ' + invite.sender_name + '`s match ');
    //     } else {
    //       this.common.presentToast('You had already replied to '+ invite.sender_name + '`s invitation ');
    //     }
  
    //   }, err => {
    //     console.log('Error:',err);
    //   });

    // } else {

    //   this.common.presentToast('You must need to upload a media to accept a match invitation');

    // }

  }

  async presentActionSheet(e, invite, i) {
    console.log('invite:',invite);
    console.log('1:',i);
    this.invite = invite;
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      header: ' File format must be MP4, AAC, Mp3, PNG, JPG ',
      buttons: [
        {
          text: 'Send Wordings',
          icon: 'text',
          handler: () => {
            this.SendWordings(i);
            console.log('Wording clicked');
          }
          },

        {
          text: 'Share Links',
          icon: 'link',
          handler: () => {
            this.pickLinks(i);
            console.log('Folder clicked');
          }
          },

          {
            text: 'Capture Image',
            icon: 'camera',
            handler: () => {
              this.CaptureImage(i);
              console.log('Camera clicked');
            }
          }, 

          {
          text: 'Capture Video',
          icon: 'videocam',

          handler: () => {
            this.CaptureVideo(i);
            console.log("Gallery clicked");
          }
        },

        {
          text: 'Capture Audio',
          icon: 'mic-circle',

          handler: () => {
            this.CaptureAudio(i);
            console.log("Audio clicked");
          }
          },

          {
          text: 'Other Files',
          icon: 'folder-open',
          handler: () => {
            this.PickDocuments(i);
            console.log('Folder clicked');
          }
          },

      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

        BringItOn() {
          console.log('Bring it on function');

          if (this.FileTransferResponse?.length != 0 || this.statusId != undefined) {

            let params = {
              request_id : this.invite.match_id,
              status : 'accept'
            }
        
            console.log('params:',params);
            this.common.postMethod('Match_reply',params).then((res:any) => {
              console.log('res:',res);
        
              if (res.status == true) {
                // this.ionViewWillEnter();
                this.common.router.navigate(['/tabs/tab8']);
                this.common.presentToast('You have successfully accepted ' + this.invite.sender_name + '`s match ');
              } else {
                this.common.presentToast('You had already replied to '+ this.invite.sender_name + '`s invitation ');
              }
        
            }, err => {
              console.log('Error:',err);
            });

          } else {

            this.common.presentToast('Please upload a media , and then click `Bring It On!` ');
          
          }

        }

      async pickLinks(i:number) {
        console.log('Pick Links Button Pressed');
        this.isLink[i] = true;
        console.log('i:',i);
        console.log('isLink:',this.isLink[i]);
        this.hideImageSpace[i] = false;
        console.log('hideImageSpace:',this.hideImageSpace[i]);
        this.isWording[i] = false;
        console.log('isWording:',this.isWording[i]);
      }

      SendWordings(i:number) {
        console.log('Wording');
        this.isLink[i] = false;
        console.log('i:',i);
        console.log('isLink:',this.isLink[i]);
        this.hideImageSpace[i] = false;
        console.log('hideImageSpace:',this.hideImageSpace[i]);
        this.isWording[i] = true;
        console.log('isWording:',this.isWording[i]);
      }

      CaptureImage(i:number) {
        this.hideImageSpace[i] = true;
        this.isWording[i] = false;
        this.isLink[i] = false;
        console.log('CaptureImage',this.hideImageSpace[i], 'isWording:', this.isWording[i], 'isLink:', this.isLink[i]);
        // this.isCaptureImage = true;
        const options: CaptureImageOptions = { limit: 1};
        this.mediaCapture.captureImage(options)
          .then(
            (data: MediaFile[]) => {
              console.log('data[0]:',data[0]);
              this.isImage[i] = true;
              this.uploadFile2(data[0], 'image', i);
            },
            (err: CaptureError) => console.error(err)
          );
      }

      CaptureAudio(i:number) {
        this.hideImageSpace[i] = true;
        this.isWording[i] = false;
        this.isLink[i] = false;
        console.log('CaptureAudio', this.hideImageSpace[i], 'isWording:', this.isWording[i], 'isLink:', this.isLink[i]);
        const options: CaptureAudioOptions = { limit: 1, duration: 2};
        this.mediaCapture.captureAudio(options)
        .then(
          (data: MediaFile[]) => {
            console.log('data[0]:',data[0]);
            this.isAudio[i] = true;
            this.uploadFile2(data[0], 'audio', i);
            console.log('Data:',data[0]);
          },
          (err: CaptureError) => console.error(err)
        );
    
      }

      CaptureVideo(i:number) {
        this.hideImageSpace[i] = true;
        this.isWording[i] = false;
        this.isLink[i] = false;
        console.log('CaptureVideo', this.hideImageSpace[i], 'isWording:', this.isWording[i], 'isLink:', this.isLink[i]);
        const options: CaptureVideoOptions = { limit: 1 , duration: 2, quality: 80};
        this.mediaCapture.captureVideo(options)
        .then(
          (data: MediaFile[]) => {
            console.log(data[0]);
            this.isVideo[i] = true;
            this.uploadFile2(data[0], 'video', i);
          },
          (err: CaptureError) => console.error(err)
        );
    
      }

      PickDocuments(i:number) {
        this.hideImageSpace[i] = true;
        this.isWording[i] = false;
        this.isLink[i] = false;

        console.log('PickDocuments', this.hideImageSpace[i], 'isWording:', this.isWording[i], 'isLink:', this.isLink[i]);
        let file: any;

        this.fileChooser.open()
        .then(uri => {
          console.log('uri:',uri);

          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            console.log('filePath:',filePath);
            let fileNameFromPath = filePath.substring(filePath.lastIndexOf('/') + 1);
            console.log('fileNameFromPath:',fileNameFromPath);

            file = {
              name: fileNameFromPath,
              fullPath: filePath
            };

            this.isImage[i] = true;
            this.uploadFile2(file, 'file', i);
          })
          .catch(err => console.log(err));

        })
        .catch(e => console.log(e));

      }

    uploadFile2(file:any, type: string, i:number) {

      let options: FileUploadOptions;

      options = {
        fileKey: "matchfile",
        fileName: file.name,
        httpMethod: 'POST',
        mimeType: 'multipart/form-data',
        chunkedMode: false,
        params: {
          matchid: this.invite.match_id,
          userid: this.userDetails.userid,
          upload_id: 0
        },
        headers: {
          Connection: 'close'
        }
     };

     console.log('options:',options);

      let filePath: any;
      if (type !== 'audio') {
        filePath = encodeURI(file.fullPath);
      } else {
        filePath = file.fullPath;
      }

      this.common.showLoader();

      const fileTransfer: FileTransferObject = this.transfer.create();

      const fileUplaodUrl = 'https://web.sicsglobal.com/iMatch/api/v1/MatchFileUpload';

      fileTransfer.onProgress((e) => 
      {
        let prg = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
        console.log("progress:"+prg);
        this.common.presentToast('Uploaded ' + prg + '% of file');
      });

      fileTransfer.upload(filePath, fileUplaodUrl, options)
        .then((data) => {

          console.log('File Transfer Success:', data);
          console.log(JSON.parse(data.response));

          let res = JSON.parse(data.response);
          
          console.log('res:',res);

          if (res.file_extension === 'mp4') {
            console.log('This is a video file');
            this.isVideo[i] = true;
            // this.isDummyImage = false;

          } else if (res.file_extension === 'aac') {
            console.log(' This is a audio file ');
            this.isAudio[i] = true;
            // this.isDummyImage = false;

          } else if (res.file_extension === 'png') {
            console.log(' This is a image file ');
            this.isImage[i] = true;
            // this.isDummyImage = false;

          } else if (res.file_extension === 'jpg') {
            console.log(' This is a image file ');
            this.isImage[i] = true;
            // this.isDummyImage = false;

          } else if (res.file_extension === 'mp3') {
            console.log(' This is a audio file ');
            this.isAudio[i] = true;
            // this.isDummyImage = false;

          }

          if (res.status == true) {
            this.common.showAlertSuccess('Match File Upload Successful');
            this.FileTransferResponse = res.upload_details;
             console.log('File Transfer Success:', this.FileTransferResponse);
             this.common.hideLoader();
          } else {
            this.common.presentToast('File upload Failed');
            console.log('File Transfer Error');
          }

          this.common.hideLoader();
        }, (err) => {
          console.log('File Transfer Error:', err);
        });
  }


}