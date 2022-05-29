import { CommonService } from "./../services/common.service";
import { StorageService } from "./../services/storage.service";
import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
const { Camera, Filesystem } = Plugins;
import { ActionSheetController } from "@ionic/angular";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import {
  Plugins,
  CameraResultType,
  CameraSource,
  FilesystemDirectory,
  CameraPhoto,
  Capacitor,
  PhotosAlbumType,
  FilesystemEncoding,
} from "@capacitor/core";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions,
  CaptureVideoOptions,
  CaptureAudioOptions,
} from "@ionic-native/media-capture/ngx";
@Component({
  selector: "app-besties",
  templateUrl: "./besties.page.html",
  styleUrls: ["./besties.page.scss"],
})
export class BestiesPage implements OnInit {
  userDetails: any = [];
  ourStory: any = [];
  ourSlogan: any = [];
  ourLetter: any = [];
  bestieDetails: any = [];
  MediaFiles: any = [];
  isDisable: boolean = true;
  CountDetails: any = [];
  CommentStatus: any = [];

  constructor(
    public storageservice: StorageService,
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private filePath: FilePath,
    private mediaCapture: MediaCapture,
    public common: CommonService
  ) {
    this.common.route.queryParams.subscribe((resp) => {
      this.bestieDetails = resp;
      console.log("bestieDetails:", this.bestieDetails);
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.GetStorageDetails();
    this.GetEnableDisableCommStatus();
  }

  GetStorageDetails() {
    this.storageservice.storage.get("userDetails").then((val) => {
      console.log("Stored Details of userDetails:", val);
      this.userDetails = val;
      this.GetPageContent();
    });
  }

  GetPageContent() {
    this.common.presentToast("⏳ Please wait . we are fetching your updates");
    let params = {
      userid: this.userDetails.userid,
      senderid: this.bestieDetails.userid,
    };
    console.log("params:", params);
    this.common.postMethod("GetStatus", params).then(
      (res: any) => {
        console.log("res:", res);

        if (res.message === "success") {
          this.CountDetails = res;
          this.ourStory = res.details.story;
          this.ourSlogan = res.details.slogan;
          this.ourLetter = res.details.letter;
          this.MediaFiles = res.link;
          return;
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
  }

  GetEnableDisableCommStatus() {
    this.storageservice.storage.get("isDisable").then((val) => {
      console.log("Stored Details of Comment Status:", val);
      this.CommentStatus = val;

      if (this.CommentStatus == 0) {
        this.isDisable = false;
        return;
      }

      if (this.CommentStatus == 1) {
        this.isDisable = true;
        return;
      }
    });
  }

  ToLikeBesties() {
    let params = {
      userid: this.userDetails.userid,
      bestieid: this.bestieDetails.userid,
    };
    console.log("params:", params);
    this.common.postMethod("bestielike", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status == true) {
          this.GetPageContent();
        }
      },
      (err) => {
        console.log("err:", err);
      }
    );
  }

  ToDisableComment(e, status) {
    let params = {
      userid: this.userDetails.userid,
    };
    console.log("params:", params);
    this.common.postMethod("disable_comment", params).then(
      (res: any) => {
        console.log("res:", res);
        if (res.status == true) {
          this.GetPageContent();
        }
      },
      (err) => {
        console.log("Error:", err);
      }
    );
    // if (status === "disable") {
    //   this.isDisable = false;
    //   this.storageservice.setStorage("isDisable", 0);
    // } else {
    //   this.isDisable = true;
    // }
  }

  GoToBestiesComment() {
    this.common.navCtrl.navigateForward(["besties-comment"], {
      queryParams: this.bestieDetails,
    });
  }

  addMoreBesties() {
    this.common.navCtrl.navigateForward(["besties-search"], {
      queryParams: this.bestieDetails,
    });
  }

  gotoBestiesCount() {
    this.common.navCtrl.navigateForward(["besties-before"]);
  }

  gotoOurStory() {
    this.common.navCtrl.navigateForward(["our-story"], {
      queryParams: this.bestieDetails,
    });
  }

  gotoOurSlogan() {
    this.common.navCtrl.navigateForward(["our-slogan"], {
      queryParams: this.bestieDetails,
    });
  }

  gotoLetter() {
    this.common.navCtrl.navigateForward(["letter"], {
      queryParams: this.bestieDetails,
    });
  }

  gotoProfile() {
    this.common.router.navigate(["/tabs/tab7"]);
  }

  async PresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: "my-custom-class",
      header: " File format must be MP4, PNG, JPG , JPEG",
      buttons: [
        {
          text: "Other Files",
          icon: "folder-open",
          handler: () => {
            this.pickDocuments();
          },
        },

        {
          text: "Capture Image",
          icon: "camera",
          handler: () => {
            this.captureImage();
          },
        },

        {
          text: "Capture Video",
          icon: "videocam",
          handler: () => {
            this.captureVideo();
          },
        },

        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  captureImage() {
    const options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options).then(
      (data: MediaFile[]) => {
        this.uploadFile2(data[0], "image");
        console.log("Data:", data[0]);
      },
      (err: CaptureError) => console.error(err)
    );
  }

  captureVideo() {
    const options: CaptureVideoOptions = { limit: 1, duration: 1, quality: 80 };
    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => {
        this.uploadFile2(data[0], "video");
        console.log("Data:", data[0]);
      },
      (err: CaptureError) => console.error(err)
    );
  }

  async pickDocuments() {
    let file: any;

    this.fileChooser
      .open()
      .then((uri) => {
        console.log("uri:", uri);

        this.filePath
          .resolveNativePath(uri)
          .then((filePath) => {
            console.log("filePath:", filePath);
            let fileNameFromPath = filePath.substring(
              filePath.lastIndexOf("/") + 1
            );

            console.log("fileNameFromPath:", fileNameFromPath);

            file = {
              name: fileNameFromPath,
              fullPath: filePath,
            };

            this.uploadFile2(file, "file");
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => console.log(e));
  }

  uploadFile2(file: any, type: string) {
    let options: FileUploadOptions;

    options = {
      fileKey: "matchfile",
      fileName: file.name,
      httpMethod: "POST",
      mimeType: "multipart/form-data",
      chunkedMode: false,
      params: {
        userid: this.userDetails.userid,
        send_to: this.bestieDetails.userid,
      },
      headers: {
        Connection: "close",
      },
    };
    console.log("options:", options);

    let filePath: any;
    if (type !== "audio") {
      filePath = encodeURI(file.fullPath);
    } else {
      filePath = file.fullPath;
    }

    this.common.showLoader();
    const fileTransfer: FileTransferObject = this.transfer.create();

    const fileUplaodUrl =
      "https://web.sicsglobal.com/iMatch/api/v1/Upload_File";

    fileTransfer.onProgress((e) => {
      let prg = e.lengthComputable
        ? Math.round((e.loaded / e.total) * 100)
        : -1;
      console.log("progress:" + prg + "%");
      this.common.presentToast("Uploaded " + prg + "% of file");

      if (prg === 100) {
        console.log("Upload completed");
      } else {
        console.log("file is uploading");
      }
    });

    fileTransfer.upload(filePath, fileUplaodUrl, options).then(
      (data) => {
        console.log("File Transfer Success:", data);
        console.log(JSON.parse(data.response));
        let res = JSON.parse(data.response);
        console.log("res:", res);
        if (res.status == true) {
          this.ionViewWillEnter();
        } else {
          console.log("File Transfer Error");
        }
        this.common.hideLoader();
      },
      (err) => {
        console.log("File Transfer Error:", err);
      }
    );
  }
}
