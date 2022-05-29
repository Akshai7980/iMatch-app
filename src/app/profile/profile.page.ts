import { CommonService } from './../services/common.service';
import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,	FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  FormSubmit : boolean = false;
  isLoading: boolean = false;
  userDetails : any = [];
  responseData : any;

  public formgroup: FormGroup;
  name: AbstractControl;
  bio: AbstractControl;
  phone: AbstractControl;
  email: AbstractControl;
  gender: AbstractControl;
  university: AbstractControl;


  userData = {
    "name": "",
    "bio": "",
    "phone": "",
    "email": "",
    "gender": "",
    // "university": "",
      };


  constructor(
    public common: CommonService,
    public formbuilder: FormBuilder,
    public storageservice: StorageService,
    public actionSheetController: ActionSheetController,
      ) { 

    this.formgroup = formbuilder.group({
      name: ['', Validators.minLength(0)],
      bio: ['', Validators.minLength(0)],
      phone: ['', Validators.minLength(0)],
      email: ['', Validators.minLength(0)],
      gender: ['', Validators.minLength(0)],
      // university: ['', Validators.minLength(0)]
    });

    this.name = this.formgroup.controls['name'];
    this.bio = this.formgroup.controls['bio'];
    this.phone = this.formgroup.controls['phone'];
    this.email = this.formgroup.controls['email'];
    this.gender = this.formgroup.controls['gender'];
    // this.university = this.formgroup.controls['university'];

    this.storageservice.storage.get('userDetails').then((val) => {
      console.log('Storage Value of userDetails:', val);
      this.userDetails = val;
    });
  }

  ngOnInit() {
    this.common.presentLoading();
      this.storageservice.storage.get('userDetails').then((val) => {
        this.userDetails = val;
        if(this.userDetails) {
          this.getProfileImg();
        } else {
          this.common.presentToast(' 🛑  Something went wrong !!!');
        }
      })
  }

  onSubmit() {
    this.FormSubmit = true;
    console.log('FormSubmit:',this.FormSubmit);
    console.log('formgroup:',this.formgroup.value);
    if(this.formgroup.valid) {

      this.common.presentLoading();

      let params = {
        name: this.userDetails.name,
        bio: this.userData.bio,
        phone: this.userData.phone,
        email: this.userDetails.email,
        gender: this.userData.gender,
        // university: this.userData.university
        university : ''
      }

      console.log('params:',params);
      this.common.postMethod('profile',this.formgroup.value).then((res:any) => {
        console.log('res:',res);
        if(res.message == 'success') {
          this.common.presentToast('Profile details updated successful');
          this.responseData = res.details[0];
          console.log('response:' ,res.details[0]);
          this.storageservice.setStorage('userDetails', res.details[0]);
          console.log('Profile updated details successfully stored');
        } else {
          this.common.presentToast('Profile details update failed !');
        }
      });
    }else {
      this.common.presentToast(' 🛑  Something went wrong !!!');
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change profile photo',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Choose from gallery',
        icon: 'images',
        handler: () => {
          this.pickImageGallery();
          console.log('Gallery clicked');
        }
      }, 
      {
        text: 'Capture Image',
        icon: 'camera',
        handler: () => {
          this.pickImage(CameraSource.Camera);
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

  async pickImage(source: CameraSource) {
    const image = await Camera.getPhoto ({
      quality: 50,
      height: 130,
      width: 130,
      source,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.Base64,
    });

    console.log('image:',image);

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);

    this.uploadImage(blobData, image.format).subscribe((newImage) => {
      console.log('newImage:',newImage);
      this.common.presentLoading();
      this.getProfileImg();
    }, err => {
      console.log(err);
      this.common.presentLoading();
      this.common.presentToast('Profile Image Uploading Failed !!!');
    });

  }

  async pickImageGallery() {
    const image = await Camera.getPhoto ({
      quality: 50,
      height: 130,
      width: 130,
      saveToGallery: true,
      correctOrientation: true,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64,
    });

    console.log('image:',image);

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
  
    this.uploadImage(blobData, image.format).subscribe((newImage) => {
      console.log('newImage:',newImage);
      this.common.presentLoading();
      this.getProfileImg();
    }, err => {
      console.log(err);
      this.common.presentLoading();
      this.common.presentToast('Profile Image Uploading Failed !!!');
    });
  }

    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }

    uploadImage(blobData, ext) {
      const formData = new FormData();
      formData.append('profile_pic', blobData, `myimage.${ext}`);
      formData.append('userid', this.userDetails.userid);

      this.common.presentLoading();
      return this.common.http.post(`${'https://web.sicsglobal.com/iMatch/api/v1/profile_pic'}`, formData);
    }

      getProfileImg() {
        this.isLoading = true;
        console.log('getProfileImg');
        let params = {
          userid : this.userDetails.userid
        }
        console.log('params:',params);
        this.common.profilepicget('get_profile_pic/' + params.userid).subscribe((res:any) => {
          console.log('res:',res);
          if (res.status == true) {
            this.userDetails = res.details[0];
            this.common.presentToast('Profile image loaded successfully...');
            this.storageservice.setStorage('userDetails', res.details[0]);
            this.isLoading = false;
            console.log('userDetails:',this.userDetails);
          } else {
            this.common.presentToast(' 🛑 Something went wrong !!!');
          }
        });
      }

    }