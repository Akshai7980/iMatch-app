import { Component, OnInit } from '@angular/core';
import { StorageService } from './../services/storage.service';
import { CommonService } from './../services/common.service';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { FormBuilder,	FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, CameraPhoto, Capacitor, PhotosAlbumType, FilesystemEncoding } from '@capacitor/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-before-match-invitation',
  templateUrl: './before-match-invitation.page.html',
  styleUrls: ['./before-match-invitation.page.scss'],
})
export class BeforeMatchInvitationPage implements OnInit {

  FormSubmit : boolean = false;
  showUploadSection = false;
  isLink: boolean = false;
  isWording: boolean = false;
  hideImageSpace: boolean = true;

  public invitation: FormGroup;
  public LinkInputForm: FormGroup;
  public WordingInputForm: FormGroup;

  description: AbstractControl;
  duration: AbstractControl;
  caption: AbstractControl;
  link: AbstractControl;
  wording: AbstractControl;

  userData = {
    "description":"",
    "duration":"",
    "caption":""
    };

    userWording = {
      "wording": ""
    }

    userLink = {
      "link": ""
    }

  opponentDetails: any = [];
  userDetails: any = [];
  MatchDetails: any = [];
  ImageDetails: any = [];
  statusId: any = [];
  FileTransferResponse: any = [];
  isMedia: boolean = false;
  isVideo: boolean = false;
  isAudio: boolean = false;
  isImage: boolean = false;
  isDummyImage: boolean = true;

  constructor(

    public common: CommonService,
    public formbuilder: FormBuilder,
    public storageservice: StorageService,
    public actionSheetController: ActionSheetController,
    private androidPermissions: AndroidPermissions,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private filePath: FilePath,
    private mediaCapture: MediaCapture,
  ) {

    this.invitation = formbuilder.group({
      description : ['', Validators.compose([
                                      Validators.required,
                                      Validators.minLength(2),
                                        ])],
      duration : ['', Validators.compose([
                                        Validators.required,
                                        Validators.minLength(1)
                                      ])],
      caption : ['', Validators.compose([
                                        Validators.minLength(2),
                                        ])],
   });

   this.LinkInputForm = formbuilder.group({
    link : ['', Validators.compose([
                                    Validators.required,
                                    Validators.minLength(9),
                                    Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')
                                      ])], 
                                    });


    this.WordingInputForm = formbuilder.group({
      wording : ['', Validators.compose([
                                    Validators.required,
                                      ])], 
                                    });

   this.link = this.LinkInputForm.controls['link'];
   this.wording = this.WordingInputForm.controls['wording'];

   this.description = this.invitation.controls['description'];
   this.duration = this.invitation.controls['duration'];
   this.caption = this.invitation.controls['caption'];

    this.common.route.queryParams.subscribe(resp => {
      this.opponentDetails = resp;
      console.log('opponentDetails:',this.opponentDetails);
  });

    }

  ngOnInit() {
    if (this.common.platform.is("cordova" || "capacitor")) {
      this.common.platform.ready().then(() => {
        this.filePermission();
      });
    }
  }

  ionViewWillEnter(){

    console.log('Entered Into Match Invitation Page');

    this.storageservice.storage.get('userDetails').then ((val) => {
      this.userDetails = val;
    });

    console.log('FileTransferResponse',this.FileTransferResponse);
    console.log('isImage:', this.isImage, 'isAudio:', this.isAudio, 'isVideo:', this.isVideo, 'isDummyImage:', this.isDummyImage);

  }

  async filePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  toCallForAMatch() {
    
    console.log('Call For A Match Clicked');
    this.FormSubmit = true ;
    console.log('invitation', this.invitation.valid, 'FormSubmit:', this.FormSubmit, 'isLink:', this.isLink, 'isWording:', this.isWording, 'isMedia:', this.isMedia);

    if (this.isLink==true) {

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

        if (this.LinkInputForm.valid) {

          let params = {

            text : this.userLink.link,
            filetype : 'link',
            userid : this.userDetails.userid
    
          }
    
          console.log('params:',params);
          this.common.postMethod('MatchUpload',params).then((res:any) => {
            console.log('res:',res);
    
              this.statusId = res.details.uploaded_id;
    
            if (res.status === true) {
    
              this.ForLinkWordingSubmit();
    
            } else {
    
              console.log('Failed');
    
            }
    
          }, (err) => {
            this.common.hideLoader();
            console.log('Error:',err);
            console.log(err.headers);
    
          });

        } else {

          console.log('Link failed');
          this.common.showAlert('The link you entered is not valid, Please enter a valid link and press launch');

        }

    } else if (this.isWording==true) {

      let params = {

        text : this.userWording.wording,
        filetype : 'text',
        userid : this.userDetails.userid

      }

      console.log('params:',params);
      this.common.postMethod('MatchUpload',params).then((res:any) => {
        console.log('res:',res);

        this.statusId = res.details.uploaded_id;

        if (res.status === true) {

          this.ForLinkWordingSubmit();

        } else {

          console.log('Failed');

        }

      }, (err) => {

        console.log('Error:',err);
        console.log(err.headers);

      });

    } else if (this.isMedia == true) {

      if (this.invitation.valid) {
        
        let params = {

          rival_id : this.userDetails.userid,
          opponent_id : this.opponentDetails.userid,
          description : this.userData.description,
          time_duration : this.userData.duration,
          caption : this.userData.caption,
          category : 'Personalized',
          uploaded_id : this.FileTransferResponse.uploaded_id,

        }

        this.common.showLoader();
        console.log('params:',params);
        this.common.postMethod('MatchInvitation',params).then((res:any) => {
          console.log('res:',res);

           if (res.status == true) {

             this.common.presentToast(' You have successfully sent a match invitation to ' + this.opponentDetails.name);
             this.common.router.navigate(['/tabs/tab3']);

           } else {

             this.common.presentToast(' Match Invitation Sending Failed ! ');

           }

          this.MatchDetails = res;
          console.log('MatchDetails:',this.MatchDetails.matchid);
           this.common.hideLoader();
           
        } , (err) => {

          console.log('Error:',err);
          console.log(err.headers);

        });

      } else {

          this.common.presentToast(' All Fields Are Mandatory ');

        }

    }

  }

    ForLinkWordingSubmit () {

      let params = {

        rival_id : this.userDetails.userid,
        opponent_id : this.opponentDetails.userid,
        description : this.userData.description,
        time_duration : this.userData.duration,
        caption : this.userData.caption,
        category : 'Personalized',
        uploaded_id : this.statusId,

      }

      this.common.showLoader();
      console.log('params:',params);
      this.common.postMethod('MatchInvitation',params).then((res:any) => {
        console.log('res:',res);

         if (res.status == true) {

          this.invitation.reset();
           this.common.presentToast(' You have successfully sent a match invitation to ' + this.opponentDetails.name);
           this.common.router.navigate(['/tabs/tab3']);

         } else {

           this.common.presentToast(' Match Invitation Sending Failed ! ');

         }

        this.MatchDetails = res;
        console.log('MatchDetails:',this.MatchDetails.matchid);
         this.common.hideLoader();
         
      } , (err) => {

        console.log('Error:',err);
        console.log(err.headers);

      });

    }

          async presentActionSheet() {

            console.log(' Action Sheet Clicked ');

            const actionSheet = await this.actionSheetController.create({
              cssClass: 'my-custom-class',
              header: ' File format must be MP4, AAC, Mp3, PNG, JPG ',
              buttons: [

                {
                  text: 'Share Wording',
                    icon: 'text',
                      handler: () => {
                        this.pickWording();
                    console.log('wording clicked');
                  }
                }, 

                {
                  text: 'Share Links',
                    icon: 'link',
                      handler: () => {
                        this.pickLinks();
                  console.log('Share clicked');
                }
              }, 

                {
                  text: 'Other Files',
                    icon: 'folder-open',
                      handler: () => {
                        this.pickDocuments();
                  console.log('Folder clicked');
                }
              }, 

              {
                text: 'Capture Image',
                  icon: 'camera',
                    handler: () => {
                      this.captureImage();
                        // this.isImage = true;
                  console.log('Camera clicked');
                }
              },

              {
                text: 'Capture Video',
                  icon: 'videocam',
                    handler: () => {
                      this.captureVideo();
                        // this.isVideo = true;
                  console.log('Camera clicked');
                }
              },

              {
                text: 'Capture Audio',
                  icon: 'mic',
                    handler: () => {
                      this.captureAudio();
                        // this.isAudio = true;
                  console.log('Camera clicked');
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

          captureImage() {
            this.isMedia = true;
              const options: CaptureImageOptions = { limit: 1 };
                this.mediaCapture.captureImage(options)
                  .then(
                    (data: MediaFile[]) => {
                      console.log(data[0]);
                        this.isImage = true;
                          this.uploadFile2(data[0], 'image');
                        console.log('Data:',data[0]);
                      },
                    (err: CaptureError) => console.error(err)
                  ); 
                }
        
          captureVideo() {
            this.isMedia = true;
              const options: CaptureVideoOptions = { limit: 1 , duration: 2, quality: 80};
                this.mediaCapture.captureVideo(options)
                  .then(
                    (data: MediaFile[]) => {
                      console.log(data[0]);
                        this.isVideo = true;
                      this.uploadFile2(data[0], 'video');
                    console.log('Data:',data[0]);
                  },
                (err: CaptureError) => console.error(err)
              );
            }
        
          captureAudio() {
            this.isMedia = true;
              const options: CaptureAudioOptions = { limit: 1};
                this.mediaCapture.captureAudio(options)
                  .then(
                    (data: MediaFile[]) => {
                      console.log(data[0]);
                    this.isAudio = true;
                  this.uploadFile2(data[0], 'audio');
                console.log('Data:',data[0]);
              },
            (err: CaptureError) => console.error(err)
           );
          }

          pickWording() {
            this.isLink = false;
              this.isWording = true;
                this.hideImageSpace = false;
            console.log('isLink:', this.isLink, 'isWording:', this.isWording, 'hideImageSpace:', this.hideImageSpace);
          }

          async pickLinks() {
            this.isLink = true;
              this.hideImageSpace = false;
            console.log('hideImageSpace:', this.hideImageSpace, 'isLink:', this.isLink);
          }

          async pickDocuments() {
            this.isMedia = true;
              let file: any;

                this.fileChooser.open()
                  .then(uri => {
                    console.log('uri:',uri);

              this.filePath.resolveNativePath(uri)
                .then(filePath => {
                  console.log('filePath:',filePath);
                    let fileNameFromPath = filePath.substring(filePath.lastIndexOf('/') + 1);
                      let currentName = uri.substring(uri.lastIndexOf('/') + 1, uri.lastIndexOf('?'));

                console.log('currentName:',currentName);
                console.log('fileNameFromPath:',fileNameFromPath);


                file = {
                  name: fileNameFromPath,
                  fullPath: filePath
                };

                this.uploadFile2(file, 'file');
              })
              .catch(err => console.log(err));

            })
            .catch(e => console.log(e));

          }

          uploadFile2(file: any, type: string) {
            this.isDummyImage = false;

            let options: FileUploadOptions;
      
            options = {
              fileKey: 'matchfile',
              fileName: file.name,
              httpMethod: 'POST',
              mimeType: 'multipart/form-data',
              chunkedMode: false,
              params: {
                matchid: '',
                userid: this.userDetails.userid,
                upload_id: 0,
              },
              headers: {
                Connection: 'close'
              }
           };
           console.log('options:', options);
      
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
              console.log("progress:"+prg+'%');
              this.common.presentToast('Uploaded ' + prg + '% of file');

              if (prg===100) {
                console.log('Upload completed');
              } else {
                console.log('file is uploading');
              }
        
            });

            fileTransfer.upload(filePath, fileUplaodUrl, options)
              .then((data) => {
                console.log('File Transfer Success:', data);
                console.log(JSON.parse(data.response));
                let res = JSON.parse(data.response);

                console.log('res:',res);

                if (res.file_extension === 'mp4') {
                  console.log('This is a video file');
                  this.isVideo = true;
                  this.isDummyImage = false;

                } else if (res.file_extension === 'aac') {
                  console.log(' This is a audio file ');
                  this.isAudio = true;
                  this.isDummyImage = false;

                } else if (res.file_extension === 'png') {
                  console.log(' This is a image file ');
                  this.isImage = true;
                  this.isDummyImage = false;

                } else if (res.file_extension === 'jpg') {
                  console.log(' This is a image file ');
                  this.isImage = true;
                  this.isDummyImage = false;

                } else if (res.file_extension === 'mp3') {
                  console.log(' This is a audio file ');
                  this.isAudio = true;
                  this.isDummyImage = false;

                }

                if (res.status == true) {
                  this.FileTransferResponse = res.upload_details;
                  console.log('File Transfer Success:', this.FileTransferResponse);

                } else {

                  console.log('File Transfer Error');

                }

                console.log('FileTransferResponse:',this.FileTransferResponse);
                this.common.hideLoader();

              }, (err) => {

                console.log('File Transfer Error:', err);
      
              });
        }

}