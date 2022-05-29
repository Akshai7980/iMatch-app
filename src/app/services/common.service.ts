import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController, Platform, NavController, PopoverController } from '@ionic/angular';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AjaxService } from './ajax.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { map } from "rxjs/operators";
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userDetails: any = [];

  constructor(public router: Router,
              public modalController: ModalController,
              public platform: Platform,
              public http: HttpClient,
              public ajx:AjaxService,
              public alertCtrl: AlertController,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public popoverController: PopoverController,
              public splashScreen: SplashScreen,
              public statusBar: StatusBar,
              public navCtrl: NavController,
              public route: ActivatedRoute,
              public fb: Facebook,
              public google: GooglePlus,
              public twit: TwitterConnect,
              public screenOrientation: ScreenOrientation,
              public menu: MenuController,
              public storage: Storage
              ) { 
                console.log('Hello Common Service Provider');
              }

              // --- Alert to show failed message ---
              async showAlert(msg) {
                const alert = await this.alertCtrl.create({
                  cssClass: 'my-custom-class',
                  header: 'Failed !',
                  message: msg,
                  buttons: ['OK']
                });
            
                await alert.present();
              }

            // --- Alert to show failed message ---
              async showAlertSuccess(msg) {
                const alert = await this.alertCtrl.create({
                  cssClass: 'my-custom-class',
                  header: 'Alert',
                  message: msg,
                  buttons: ['OK']
                });
            
                await alert.present();
              }

              async presentToast(msg) {
                const toast = await this.toastController.create({
                  message: msg,
                  duration: 3000,
                  position: 'bottom',
                  // mode: 'md'
                });
                toast.present();
              }

              async presentLoading() {
                const loading = await this.loadingController.create({
                  cssClass: 'my-custom-class',
                  // message: 'Please wait...',
                  duration: 900,
                  spinner: 'dots'
                });
                await loading.present();
            
                const { role, data } = await loading.onDidDismiss();
                console.log('Loading dismissed!');
              }

              async showLoader() {
                // await this.loadingController.dismiss();
                 const loading = await this.loadingController.create({
                  // message: 'Please wait...',
                  spinner: 'dots'
                });
                await loading.present();
              }

              async hideLoader() {
                 await this.loadingController.dismiss();
              }

              GetStoredUserDetails() {
                this.storage.get('userDetails').then((val) => {
                  this.userDetails = val;
                });
              }

    register(path,params:any) {
      console.log(params);
      let httpParams = new HttpParams()
        .append("name", params.name)
        .append("phone", params.phone)
        .append("email", params.email)
        .append("password", params.password)
        .append("university", params.university)
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .post(this.ajx.BaseUrl+path,httpParams,config)
    }

    login(path,params:any) {
      console.log(params);
      let httpParams = new HttpParams()
        .append("email", params.email)
        .append("password", params.password)
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .post(this.ajx.BaseUrl+path,httpParams,config)
    }

    forgotpassword(path,params:any) {
      console.log(params);
      let httpParams  = new HttpParams()
        .append("email",params.email)
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .post(this.ajx.BaseUrl+path,httpParams,config)
    }

    profileupdate(path,params:any) {
      console.log(params);
      let httpParams = new HttpParams()
      .append("name", params.name)
      .append("email", params.email)
      .append("bio", params.bio)
      .append("phone", params.phone)
      .append("gender", params.gender)
      .append("university", params.university)
      .append("code", params.code)
      .append("userid", params.userid)
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .post(this.ajx.BaseUrl+path,httpParams,config)
    }

    profilepic(path,params:any) {
      console.log(params);
      let httpParams = new HttpParams()
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .post(this.ajx.BaseUrl+path,httpParams,config)    
    }

    profilepicget(path) {
      let httpParams = new HttpParams()
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .get(this.ajx.BaseUrl+path,config)    
    }

    listUsers(path,params) {
      console.log(params);
      let httpParams = new HttpParams()
      .append("userid", params.userid)
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .post(this.ajx.BaseUrl+path,httpParams,config)
    }

    listMyBesties(path) {
      let httpParams = new HttpParams()
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .get(this.ajx.BaseUrl+path,config)
    }

    getMyNotification(path) {
      let httpParams = new HttpParams()
      var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
      return this.http
      .get(this.ajx.BaseUrl+path,config)
    }

    postMethod(path:any,params:any) {
      let body = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
      let headers = new HttpHeaders();
      headers = headers.set( 'Content-Type', 'application/x-www-form-urlencoded') 
      return new Promise((resolve, reject) => {
        this.http.post (this.ajx.BaseUrl + path, body, {headers: headers})
        .pipe(map ((res:any) => res))
        .subscribe(
          (res) => {       
              console.log("POST call successful value returned in body",
                    res);
                          resolve(res);
                                  },
          (err) => {       
              console.log("POST call in error", err);
              reject(err);
          }
          ,
          () => {
              console.log("The POST observable is now completed.");
          }
          );    
    });
    }

    PostData(path: any, params: any) {
      console.log('path:', path);
      console.log('Params:', params);
  
      const config = { headers: { 'Content-Type': 'application/json' } };

      return this.http
        .post(this.ajx.BaseUrl + path, params, config)
        .pipe(map(res => res));
    }

}