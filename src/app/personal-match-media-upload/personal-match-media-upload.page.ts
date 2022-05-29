import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,	FormGroup, Validators, AbstractControl} from '@angular/forms';
import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';
import { ActionSheetController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, CameraPhoto, Capacitor, PhotosAlbumType, FilesystemEncoding } from '@capacitor/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-personal-match-media-upload',
  templateUrl: './personal-match-media-upload.page.html',
  styleUrls: ['./personal-match-media-upload.page.scss'],
})

export class PersonalMatchMediaUploadPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  myFiles:string [] = [];

  FormSubmit : boolean = false;
  showUploadSection = false;
  isLink: boolean = false;
  hideImageSpace: boolean = true;

  LinkInputForm: FormGroup;
  TextInputForm: FormGroup;
  Invitation: FormGroup;

  description: AbstractControl;
  caption: AbstractControl;
  
  link1: AbstractControl;
  link2: AbstractControl;

  Text1: AbstractControl;
  Text2: AbstractControl;

  userData = {
    "caption" :"",
    // "file" : "",
    };

    userLink = {
      "caption" :"",
      "link1" : "",
      "link2" : "",
      };

      userText = {
        "caption" :"",
        "text1" : "",
        "text2" : ""
        };

    userDetails: any;
    MatchDetails: any;
    statusId: any;
    MediaArray: any = [];
    FileTransferResponse: any = [];
    zufall: number;
    isWordings: boolean = false;
    MediaFiles = [];
    imgURL: any;
    progressInfos = [];
    selectedFiles: FileList;
    message : string;
    Links = [];
    imagePath;
    imagePath2;
    imgURL2: any;
    urls = new Array<string>();
    Text = [];
    isCaptureImage: boolean = false;
    FolderClicked: boolean = false;
    CaptureClicked: boolean = false;

  constructor(
    public common: CommonService,
    public formbuilder: FormBuilder,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private filePath: FilePath,
    private mediaCapture: MediaCapture,
    public storageservice: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private http : HttpClient,
  ) {

    this.Invitation = formbuilder.group({
      caption : ['', Validators.compose([
                                Validators.minLength(0),
                                        ])],
      file : ['', Validators.compose([
                             Validators.required,
                             Validators.minLength(2),
                                        ])],
   });

    this.LinkInputForm = formbuilder.group({
      caption : ['', Validators.compose([
        Validators.minLength(0),
                ])],

      link1 : ['', Validators.compose([
                                      // Validators.required,
                                      Validators.minLength(10),
                                      Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')
                                        ])],
      link2 : ['', Validators.compose([
                                      // Validators.required,
                                      Validators.minLength(10),
                                      Validators.pattern('(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?')
                                            ])],
                                      });

    this.TextInputForm = formbuilder.group({
                                        caption : ['', Validators.compose([
                                          Validators.minLength(0),
                                                  ])],
                                                  
                                        text1 : ['', Validators.compose([
                                                                        Validators.required,
                                                                        Validators.minLength(5),
                                                                          ])],
                                        text2 : ['', Validators.compose([
                                                                        Validators.required,
                                                                        Validators.minLength(5),
                                                                              ])],
                                                                        });                                 
   this.caption = this.LinkInputForm.controls['caption'];
   this.link1 = this.LinkInputForm.controls['link1'];
   this.link2 = this.LinkInputForm.controls['link2'];

   this.caption = this.TextInputForm.controls['caption'];
   this.Text1 = this.TextInputForm.controls['text1'];
   this.Text2 = this.TextInputForm.controls['text2'];

   this.caption = this.Invitation.controls['caption'];

   }


  ngOnInit() {
  }

  ionViewWillEnter(){
   console.log('Entered Into Personal Match Media Upload Page');

   this.storageservice.storage.get('userDetails').then ((val) => {
    this.userDetails = val;
  });

  }

      toShowLinkInputFiled() {
        console.log('Link Input Clicked');
        this.isLink = true;
        this.isWordings = false;
        this.hideImageSpace = false;
      }

      toShowTextArea() {
        console.log('Text Input Clicked');
        this.isWordings = true;
        this.isLink =false;
        this.hideImageSpace = false;
      }

    // toProceed() {
    //   this.FormSubmit = true;

    //   if (this.Invitation.valid) {

    //     let params = {

    //       rival_id : this.userDetails.userid,
    //       // opponent_id : this.opponentDetails.userid,
    //       description : this.userData.description,
    //       // time_duration : this.userData.duration,
    //       caption : this.userData.caption,
    //       category : 'Personal Match',
    //       // uploaded_id : this.ImageDetails.upload_details.uploaded_id,

    //     }

    //     console.log('params:',params);

    //     this.common.postMethod('MatchInvitation',params).then((res:any) => {
    //       console.log('res:',res);

    //       if (res.status == true) {

    //         this.Invitation.reset();
    //         this.common.presentToast('Your Personal Match is Successfully Uploaded');
    //         this.common.router.navigate(['/tabs/tab6']);

    //       } else {

    //         this.common.presentToast('Your Personal Match Media Uploading Failed');

    //       }

    //       this.MatchDetails = res;
    //       console.log('matchDetails:',this.MatchDetails.matchid);

    //     } , (err) => {

    //       console.log('Error:',err);
    //       console.log(err.headers);

    //     });
    //   } else {

    //     this.common.presentToast(' All Fields Are Mandatory ');

    //   }
    // }

    toSubmitLinkField() {

      console.log('Form Validation Done');

      if (this.LinkInputForm.valid) {

        let params = {

          // text : this.userLink.link1,
          filetype : 'link',
          userid : this.userDetails.userid

        }
        console.log('params:',params);
        this.common.postMethod('MatchUpload',params).then((res:any) => {
          console.log('res:',res);

          this.statusId = res.details.uploaded_id;

        }, (err) => {

          console.log('Error:',err);
          console.log(err.headers);

        });

      } else if (this.isLink==true && this.LinkInputForm.dirty) {
        this.common.presentToast('Please Input A Valid Link');
        this.LinkInputForm.reset();
      }

    }

   async presentActionSheet() {
    console.log('Action Sheet Clicked');
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose Atleast 2 File For Personal Match',
      buttons: [

        {
          text: 'Send Wordings',
          icon: 'text',
          handler: () => {
            this.SendWordings();
            console.log('Wording clicked');
          }
          },

        {
          text: 'Share Links',
          icon: 'link',
          handler: () => {
            this.PickLinks();
            console.log('Share clicked');
          }
          },

          {
            text: 'Capture Image',
            icon: 'camera',
            handler: () => {
              this.CaptureImage();
              console.log('Camera clicked');
            }
          }, 

          {
          text: 'Capture Video',
          icon: 'videocam',

          handler: () => {
            this.CaptureVideo();
            console.log("Gallery clicked");
          }
        },

        {
          text: 'Capture Audio',
          icon: 'mic-circle',

          handler: () => {
            this.CaptureAudio();
            console.log("Audio clicked");
          }
          },

          {
          text: 'Other Files',
          icon: 'folder-open',
          handler: () => {
            this.PickDocuments();
            console.log('Folder clicked');
          }
          },

          {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }

        SendWordings() {
          console.log('Wording');
            this.isWordings = true;
              this.hideImageSpace = false;
                this.isLink = false;

                let params = {
                  userid : this.userDetails.userid,
                  word1 : '',
                  word2 : ''
                }
                console.log('params:',params);
                this.common.postMethod('',params).then((res:any) => {
                  console.log('res:',res);
                }, err => {
                  console.log(err);
                });
        }

      CaptureImage() {
        console.log('CaptureImage');
        this.isCaptureImage = true;
        const options: CaptureImageOptions = { limit: 2 };
        this.mediaCapture.captureImage(options)
          .then(
            (data: MediaFile[]) => {
              console.log('data[0]:',data[0]);
              console.log('data[1]:',data[1]);
              this.MediaFiles[0] = data[0].name;
              this.MediaFiles[1] = data[1].name;


              for (let i=0; i<this.MediaFiles.length; i++) {
                this.myFiles.push(this.MediaFiles[i]);
              }
            },
            (err: CaptureError) => console.error(err)
          );

      }

      CaptureVideo() {
        console.log('CaptureVideo');
        const options: CaptureImageOptions = { limit: 2 };
        this.mediaCapture.captureVideo(options)
        .then(
          (data: MediaFile[]) => {
            console.log(data[0]);
            // this.uploadFile2(data[0], 'video');
          },
          (err: CaptureError) => console.error(err)
        );
    
      }

      CaptureAudio() {
        console.log('CaptureAudio');
        const options: CaptureImageOptions = { limit: 2 };
        this.mediaCapture.captureAudio(options)
        .then(
          (data: MediaFile[]) => {
            console.log(data[0]);
            // this.uploadFile2(data[0], 'audio');
          },
          (err: CaptureError) => console.error(err)
        );
    
      }

      PickLinks() {
        console.log('Pick Links Button Presses');
          this.isLink = true;
            console.log('isLink:',this.isLink);
              this.hideImageSpace = false;
                console.log('hideImageSpace:',this.hideImageSpace);
      }

      PickDocuments() {

        console.log('PickDocuments');
        let file: any;

        this.fileChooser.open()
        .then(uri => {
          console.log(uri);

          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            console.log(filePath);
            file = {
              name: '',
              fullPath: filePath
            };

            // this.uploadFile2(file, 'file');
          })
          .catch(err => console.log(err));

        })
        .catch(e => console.log(e));

      }

      // click() {
      //   // var clicks  = 0;
      //   clicks += 1;
      //   document.getElementById('clicks').innerHTML =  clicks;
      // }

      fileChangeEvent(e, type) {
        if (type==='folder') {
          
          this.FolderClicked = true;
          console.log('FolderClicked:',this.FolderClicked);

          if (e.target.files.length>2) {
            this.Invitation.reset();
            this.common.presentToast('Your are not allowed to choose more than two images');
          } 
  
          if (e.target.files === 0) {
            this.common.presentToast('You Have Selected No File !!!');
            return;
          }
  
          if (e.target.files.length===1) {
            this.Invitation.reset();
            this.common.showAlert('Try to choose maximum 2 media');
          } 

          this.selectedFiles = e.target.files;
          for (let i=0; i<e.target.files.length; i++) {
            this.myFiles.push(e.target.files[i]);
          }

        this.urls = [];
        console.log('urls:',this.urls);
        let files = e.target.files;
        console.log('files:',files);
        if (files) {
          for (let file of files) {
            let reader = new FileReader();
            var error = reader.error
            reader.onload = (e:any) => {
              console.log('Loaded:', reader.result);
              console.log('error:', error);
              this.urls.push(e.target.result);
              console.log('urls:',this.urls);
            }

            reader.readAsDataURL(file);
          }
        }

      } else if (type==='image') {

        this.FolderClicked = false;
        console.log('camera clicked:',this.FolderClicked);

              if (this.MediaFiles.length===0) {
              this.MediaFiles[0] = e.target.files[0];
              console.log('MediaFiles:',this.MediaFiles);
              this.common.showAlert('Try to capture maximum 2 images');

            } else {
              this.MediaFiles[1] = e.target.files[0];
              console.log('MediaFiles:',this.MediaFiles);

                for (let i=0; i<this.MediaFiles.length; i++) {
                  this.myFiles.push(this.MediaFiles[i]);
                  console.log('myFiles:',this.myFiles);
                }
            }

        } else if (type==='audio') {

          this.FolderClicked = false;
          console.log('recorder clicked:',this.FolderClicked);
  
                if (this.MediaFiles.length===0) {
                this.MediaFiles[0] = e.target.files[0];
                console.log('MediaFiles:',this.MediaFiles);
                this.common.showAlert('Try to capture maximum 2 audio');
  
              } else {
                this.MediaFiles[1] = e.target.files[0];
                console.log('MediaFiles:',this.MediaFiles);
  
                  for (let i=0; i<this.MediaFiles.length; i++) {
                    this.myFiles.push(this.MediaFiles[i]);
                    console.log('myFiles:',this.myFiles);
                  }
              }

        } else if (type==='video') {

          this.FolderClicked = false;
          console.log('recorder clicked:',this.FolderClicked);
  
                if (this.MediaFiles.length===0) {
                this.MediaFiles[0] = e.target.files[0];
                console.log('MediaFiles:',this.MediaFiles);
                this.common.showAlert('Try to capture maximum 2 video');
  
              } else {
                this.MediaFiles[1] = e.target.files[0];
                console.log('MediaFiles:',this.MediaFiles);
  
                  for (let i=0; i<this.MediaFiles.length; i++) {
                    this.myFiles.push(this.MediaFiles[i]);
                    console.log('myFiles:',this.myFiles);
                  }
                }

        }
    }

    //   fileChangeEvent(e,type) {
    //     console.log('E:',e);

    //     if (type==='folder') {
    //       this.FolderClicked = true;
    //       console.log('FolderClicked:',this.FolderClicked);

    //       if (e.target.files.length>2) {
    //         this.Invitation.reset();
    //         this.common.presentToast('Your are not allowed to choose more than two images');
    //       } 
  
    //       if (e.target.files === 0) {
    //         this.common.presentToast('You Have Selected No File !!!');
    //         return;
    //       }
  
    //       if (e.target.files.length===1) {

    //         this.Invitation.reset();
    //         this.common.showAlert('Try to choose maximum 2 media');
    //       } 

    //     } else if (type==='image') {
    //       this.FolderClicked = false;
    //       console.log('FolderClicked:',this.FolderClicked);

    //       if (e.target.accept === "image/*" && e.target.files.length!==0) {
    //         // this.storageservice.setStorage('FirstImage',e.target.files[0]);
    //         // console.log('Image File Successfully saved in device');

    //         // if (e.target.files.length>2) {
    //         //   this.Invitation.reset();
    //         //   this.common.presentToast('Your are not allowed to capture more than two images');
    //         // } 
    
    //         // if (e.target.files === 0) {
    //         //   this.common.presentToast('You Have Selected No File !!!');
    //         //   return;
    //         // }
    
    //         // if (e.target.files.length===1) {
    //         //   // this.Invitation.reset();
    //         //   this.common.showAlert('Try to capture maximum 2 images');
    //         // } 

    //         if (this.MediaFiles.length===0) {
    //           this.MediaFiles[0] = e.target.files[0];
    //           console.log('MediaFiles:',this.MediaFiles);
    //           this.common.showAlert('Try to capture maximum 2 images');

    //         } else {
    //           this.MediaFiles[1] = e.target.files[0];
    //           console.log('MediaFiles:',this.MediaFiles);
    //           // this.selectedFiles = this.MediaFiles;

    //           if (this.MediaFiles.length===2) {
    //             for (let i=0; i<this.MediaFiles.length; i++) {
    //               this.myFiles.push(this.MediaFiles[i]);

    //               console.log('myFiles:',this.myFiles);
    //             }
    //           } else {
    //             console.log('Media Files array index 2 is vacant');
    //           }

    //         }
  
    //       } else {
    //         console.log('Two Image Files Selected');
    //       }

    //     } else if (type==='video') {
    //       // this.CaptureClicked = true;
    //       // console.log('CaptureClicked:',this.CaptureClicked);
    //       this.FolderClicked = false;
    //       console.log('FolderClicked:',this.FolderClicked);

    //       // if (e.target.files.length>2) {
    //       //   this.Invitation.reset();
    //       //   this.common.presentToast('Your are not allowed to capture more than two videos');
    //       // } 
  
    //       // if (e.target.files === 0) {
    //       //   this.common.presentToast('You Have Captured No Videos !!!');
    //       //   return;
    //       // }
  
    //       if (e.target.files.length===1) {
    //         // this.Invitation.reset();
    //         this.common.showAlert('Try to capture maximum 2 video');
    //       } 

    //       if (e.target.accept === "video/*" && e.target.files.length !== 0) {
    //         // this.storageservice.setStorage('FirstVideo',e.target.files[0])
    //         // console.log('Video File Successfully saved in device');
    //         // this.MediaFiles[0] = 

    //         if (this.MediaFiles.length===0) {
    //           this.MediaFiles[0] = e.target.files[0];
    //           console.log('MediaFiles:',this.MediaFiles);
    //         } else {
    //           this.MediaFiles[1] = e.target.files[0];
    //           console.log('MediaFiles:',this.MediaFiles);

    //           for (let i=0; i<this.MediaFiles.length; i++) {
    //             this.myFiles.push(this.MediaFiles[i]);
    //           }
    //           console.log('myFiles:',this.myFiles);

    //         }
  
    //         // if (this.MediaFiles.length===2) {
    //         //   for (let i=0; i<this.MediaFiles.length; i++) {
    //         //     this.myFiles.push(this.MediaFiles[i]);
    //         //   }
    //         // } else {
    //         //   console.log('Media Files array index 2 is vacant');
    //         // }
            
    //       } else {
    //         console.log('Two Video Files Selected');
    //       }

    //     } else if (type==='audio') {
    //       // this.CaptureClicked = true;
    //       // console.log('CaptureClicked:',this.CaptureClicked);
    //       this.FolderClicked = false;
    //       console.log('FolderClicked:',this.FolderClicked);

    //       if (e.target.accept === "audio/*" && e.target.files.length != 0) {
    //         // this.storageservice.setStorage('FirstAudio',e.target.files[0]);
    //         // console.log('Audio File Successfully saved in device');

    //         if (e.target.files.length>2) {
    //           this.Invitation.reset();
    //           this.common.presentToast('Your are not allowed to record more than two audio');
    //         } 
    
    //         if (e.target.files === 0) {
    //           this.common.presentToast('You Have Recorded No Audio !!!');
    //           return;
    //         }
    
    //         if (e.target.files.length===1) {
    //           // this.Invitation.reset();
    //           this.common.showAlert('Try to record maximum 2 audio');
    //         } 

    //         if (this.MediaFiles.length===0) {
    //           this.MediaFiles[0] = e.target.files[0];
    //           console.log('MediaFiles:',this.MediaFiles);
    //         } else {
    //           this.MediaFiles[1] = e.target.files[0];
    //           console.log('MediaFiles:',this.MediaFiles);
    //           // this.selectedFiles = this.MediaFiles;
    //         }
  
    //         if (this.MediaFiles.length===2) {
    //           for (let i=0; i<this.MediaFiles.length; i++) {
    //             this.myFiles.push(this.MediaFiles[i]);
    //           }
    //         } else {
    //           console.log('Media Files array index 2 is vacant');
    //         }
  
    //       } else {
    //         console.log('Two Audio Files Selected');
    //       }

    //     }


    //     this.urls = [];
    //     console.log('urls:',this.urls);
    //     let files = e.target.files;
    //     console.log('files:',files);
    //     if (files) {
    //       for (let file of files) {
    //         let reader = new FileReader();
    //         var error = reader.error
    //         reader.onload = (e:any) => {
    //           console.log('Loaded:', reader.result);
    //           console.log('error:', error);
    //           this.urls.push(e.target.result);
    //           console.log('urls:',this.urls);
    //         }

    //         reader.onerror = error => {
    //           console.log('error:', error);
    //         }

    //         reader.onprogress = (e:any) => {
    //           console.log('e:', e);
    //         }

    //         reader.onabort = (e:any) => {
    //           console.log('Aborted');
    //         }

    //         reader.readAsDataURL(file);
    //         // getFileCon
    //       }
    //     }
      

    //     // var mimeType = e.target.files[0].type;
    //     // if (mimeType.match(/png\/*/)==null) {
    //     //   this.message = 'only image';
    //     //   console.log('message',this.message);

    //     //   return;
    //     // }

    //     // for (let i=0; i<e.target.files.length; i++) {
    //     //   var reader = new FileReader();
    //     //   this.imagePath = e.target.files;
    //     //   console.log('imagePath',this.imagePath);
  

    //     //   reader.onload = (_event) => { 
    //     //     this.imgURL = reader.result;
    //     //     console.log('imgURL',this.imgURL);
    //     //   }
    //     //   reader.readAsDataURL(e.target.files[i]);

    //     // }

    //       // for (let i=0; i<e.target.length; i++) {
    //       //   var reader = new FileReader();
    //       //   this.imagePath = e.target.files;
    //       //   console.log('imagePath',this.imagePath);

    //       //   reader.onload = (_event) => {
    //       //     console.log('Event:',reader.result);
    //       //     this.imgURL.push(reader.result);
    //       //     console.log('imgURL',this.imgURL);

    //       //     // this.Invitation.patchValue({
    //       //     //   fileSource: this.imgURL
    //       //     // });
    //       //   }
    //       //   reader.readAsDataURL(e.target.files[i]);
    //       // }

    //     //   var reader = new FileReader();
    //     //   this.imagePath2 = e.target.files[1];
    //     //   console.log('imagePath2',this.imagePath2);
  
    //     //   reader.readAsDataURL(e.target.files[1]);
    //     //   reader.onload = (_event) => { 
    //     //     this.imgURL2 = reader.result;
    //     //     console.log('imgURL2',this.imgURL2);
    //     // }

    //     // this.previewImages(e);
    //     this.progressInfos = [];
    //     this.selectedFiles = e.target.files;
    //     // document.getElementById('UploadFile').nodeValue =='';
    //     for (let i=0; i<e.target.files.length; i++) {
    //       this.message = '';
    //       this.myFiles.push(e.target.files[i]);
    //     }

    //     // this.MediaFiles = e.target.files;
    //     // this.imgURL = e.target.value;

      
    // }

      // previewImages(e) {

      //   var preview = document.querySelector('#preview');
        
      //   if (e.target.files) {
      //     [].forEach.call(e.target.files, readAndPreview);
      //   }
      
      //   function readAndPreview(file) {
      
      //     // Make sure `file.name` matches our extensions criteria
      //     if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      //       return alert(file.name + " is not an image");
      //     } // else...
          
      //     var reader = new FileReader();
          
      //     reader.addEventListener("load", function() {
      //       var image = new Image();
      //       image.height = 100;
      //       image.title  = file.name;
      //       image.src    = e.target.result;
      //       preview.append(image);
      //     });
          
      //     reader.readAsDataURL(file);
          
      //   }

      //   document.querySelector('#file-input').addEventListener("change", this.previewImages);

      
      // }
      
      // document.querySelector('#file-input').addEventListener("change", previewImages);


    //   getFileContentAsBase64(path,callback){
    //     window.resolveLocalFileSystemURL(path, gotFile, fail);
                
    //     function fail(e) {
    //           alert('Cannot found requested file');
    //     }
    
    //     function gotFile(fileEntry) {
    //            fileEntry.file(function(file) {
    //               var reader = new FileReader();
    //               reader.onloadend = function(e) {
    //                    var content = this.result;
    //                    callback(content);
    //               };
    //               // The most important point, use the readAsDatURL Method from the file plugin
    //               reader.readAsDataURL(file);
    //            });
    //     }
    // }

//     var path = "file://storage/0/downloads/myimage.png";

// // Convert image
//     getFileContentAsBase64(path,function(base64Image){
//       //window.open(base64Image);
//       console.log(base64Image); 
//       // Then you'll be able to handle the myimage.png file as base64
//     });

      submit() {
        // this.storageservice.storage.get('FirstAudio').then((val) => {
        //   console.log('Value:',val);
        //   // console.log('');

        // });
        if (this.hideImageSpace==true && this.Invitation.valid) {

          if (this.myFiles.length===2) {

          this.common.showLoader();
          this.common.presentToast('⏳ Please wait... we are uploading your file ...');
          const formData = new FormData();

          for( let i=0;i<this.myFiles.length; i++) 
          {
            formData.append("filename[]",this.myFiles[i]);
            console.log('myFiles:',this.myFiles[i]);
          }
            formData.append("caption", this.userData.caption);
            formData.append("userid", this.userDetails.userid);
            formData.append("links", '');
            formData.append("texts", '');
              console.log('formData:', formData);
            this.http.post('https://web.sicsglobal.com/iMatch/api/v1/create_personalmatch',formData 
            ).subscribe((res) => {
              console.log(res);
              if (res['message']==='Successfully uploaded') {
                this.Invitation.reset();
                this.common.presentToast('File Uploaded Successful');
                this.common.router.navigate(['tabs/tab6']);
                this.common.hideLoader();
              } else {
                this.common.hideLoader();
                this.common.presentToast('File Upload Failed !!!');
              }
            }, err => {
              this.common.hideLoader();
              console.log('err',err);
              console.log(err.headers);
            });

          } else {

            this.common.showAlert('You are not allowed to submit a personal match with single media');

          }

        } else if (this.isLink==true) {
          // this.common.presentLoading();
            const regex  = '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)';

          if (this.userLink.link1.match(regex)!=null) {

            console.log('Matching link');
              this.Links[0] = this.userLink.link1;
                console.log('link1',this.Links[0]);

          } else {

            console.log('No Match');
              this.Links[0] = 'https://'+this.userLink.link1;
                console.log('link1',this.Links[0]);

          }

          if (this.userLink.link2.match(regex)!=null) {

            console.log('Matching link');
              this.Links[1] = this.userLink.link2;
                console.log('link2',this.Links[1]);

          } else {

            console.log('No Match');
              this.Links[1] = 'https://'+this.userLink.link2;
                console.log('link2',this.Links[1]);

          }

          console.log('link1',this.userLink.link1);
          console.log('link2',this.userLink.link2);

          if (this.LinkInputForm.valid) {
            this.common.presentLoading();
            const formData = new FormData();

            formData.append("filename[]",'');
            formData.append("caption", this.userLink.caption);
            formData.append("userid", this.userDetails.userid);

            for( let i=0;i<this.Links.length; i++) {
              formData.append("links[]", this.Links[i]);
            }

            formData.append("texts", '');
              console.log('formData:', formData);
            this.http.post('https://web.sicsglobal.com/iMatch/api/v1/create_personalmatch',formData).subscribe(res => {
              console.log(res);
              if (res['message']==='Successfully uploaded') {
                this.Invitation.reset();
                this.common.presentToast('File Uploaded Successful');
                this.common.router.navigate(['tabs/tab6']);
                // this.common.hideLoader();

              } else {
                // this.common.hideLoader();

                this.common.presentToast('File Upload Failed !!!');
              }
            }, err => {
              // this.common.hideLoader();

              console.log('err',err);
              console.log(err.headers);
            });
            
          } else {
            console.log('Link is not valid');
            // this.common.hideLoader();
            this.common.showAlert('The link you entered is not valid, Please enter a valid link and press launch');
          }

        } else if (this.isWordings==true && this.TextInputForm.valid) {

          // this.common.presentLoading();
          this.common.showLoader();

          console.log('Text1',this.userText.text1);
          console.log('Text2',this.userText.text2);
          this.Text[0] = this.userText.text1;
          this.Text[1] = this.userText.text2;
          console.log('Text:',this.Text);

          // let params = {
          //   'filename[]' : '',
          //   caption : this.userText.caption,
          //   userid : this.userDetails.userid,
          //   links : [this.userLink.link1,this.userLink.link2],
          //   text : ''
          // }
          // console.log('params:',params);
          // this.common.postMethod('create_personalmatch',params).then((res:any) => {
          //   console.log('res:',res);
          // }, err => {
          //               console.log('err',err);
          //   console.log(err.headers);
          // });

          const formData = new FormData();
          // var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };

          formData.append("filename[]",'');
          formData.append("caption", this.userText.caption);
          formData.append("userid", this.userDetails.userid);
          formData.append("links", '');

          for( let i=0;i<this.Text.length; i++) {
            formData.append("texts[]", this.Text[i]);
          }

          // formData.append("texts[]", );
          // this.userText.text1,this.userText.text2
            console.log('formData:', formData.getAll("texts"));
          this.http.post('https://web.sicsglobal.com/iMatch/api/v1/create_personalmatch',formData).subscribe(res => {
            console.log(res);
            // this.common.presentLoading();

            if (res['message']==='Successfully uploaded') {
              this.Invitation.reset();
              this.common.presentToast('File Uploaded Successful');
              this.common.router.navigate(['tabs/tab6']);
              this.common.hideLoader();

            } else {

              this.common.presentToast('File Upload Failed !!!');
              this.common.hideLoader();

            }
          }, err => {
            console.log('err',err);
            console.log(err.headers);
            this.common.hideLoader();

          });

        } else if (this.isCaptureImage==true) {

          // this.common.presentLoading();
          this.common.showLoader();

          const formData = new FormData();

          for( let i=0;i<this.myFiles.length; i++) 
          {
            formData.append("filename[]",this.myFiles[i]);
            console.log('myFiles:',this.myFiles[i]);
          }
            formData.append("caption", this.userData.caption);
            formData.append("userid", this.userDetails.userid);
            formData.append("links[]", '');
            formData.append("texts", '');
              console.log('formData:', formData);
              // this.common.presentLoading();
            this.http.post('https://web.sicsglobal.com/iMatch/api/v1/create_personalmatch',formData 
            ).subscribe((res) => {
              // this.common.presentLoading();

              console.log(res);
              if (res['message']==='Successfully uploaded') {
                this.Invitation.reset();
                this.common.presentToast('File Uploaded Successful');
                this.common.router.navigate(['tabs/tab6']);
                this.common.hideLoader();

              } else {
                this.common.presentToast('File Upload Failed !!!');
                this.common.hideLoader();

              }
            }, err => {
              console.log('err',err);
              console.log(err.headers);
              this.common.presentToast('File Upload Failed !!!');
              this.common.hideLoader();

            });

        }

      }

      uploadFile2(file:any, type: string) {

        var arr = new Array (file[0]['name'],file[1]['name']);
        var str = arr.toString();
        console.log('Returned string is :'+ str);

        // Upload audio to server
  
        let options: FileUploadOptions;

        // for(i=0;i<file.length;i++)
  
        options = {
          fileKey: "filename[]",
          fileName: str,
          httpMethod: 'POST',
          mimeType: 'multipart/form-data',
          chunkedMode: false,
          params: {
            caption: this.userData.caption,
            userid: this.userDetails.userid,
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
  
        const fileTransfer: FileTransferObject = this.transfer.create();
  
        const fileUplaodUrl = 'https://web.sicsglobal.com/iMatch/api/v1/create_personalmatch';

        fileTransfer.onProgress((e) => 
        {
          let prg = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
          console.log("progress:"+prg);
        });

        fileTransfer.upload(filePath, fileUplaodUrl, options)
          .then((data) => {
            console.log('File Transfer Success:', data);
            this.FileTransferResponse = data;
          }, (err) => {
            console.log('File Transfer Error:', err);
  
          });

    }

    ToLaunchAMatch(e) {
      console.log('To Launch A Match Clicked',e);
      if (e.type=='click' && this.FileTransferResponse.responseCode!=undefined) {

        if (this.FileTransferResponse.response===true) {
          // this.common.presentLoading();
          this.common.showLoader();

          setTimeout(() => {
            this.common.presentToast('Your Personal Match is Uploaded Successfully');
            this.common.router.navigate(['tabs/tab6']);
          },3000);

          this.common.hideLoader();

        } else {
          this.common.presentLoading();
          this.common.presentToast('Your Personal Match Upload Failed');
        }
      } else {
        // this.common.showLoader();
        console.log('File Response is empty');
        this.common.presentToast('Submit with valid details... and wait for a while to gets uploaded to our server ...');
        // this.common.hideLoader();
      }
    }

}
