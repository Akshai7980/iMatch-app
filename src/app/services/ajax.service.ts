import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from './../services/storage.service';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor } from '@capacitor/core';
import { Router } from '@angular/router'; 
const { PushNotifications, Device, Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  BaseUrl : any = 'https://web.sicsglobal.com/iMatch/api/v1/';

  constructor(
    public storageservice: StorageService,
    private geolocation: Geolocation,
    public http: HttpClient,
    private router: Router,
    ) {
      console.log('Hello AjaxService Provider');
     }

     initPush() {
      if (Capacitor.platform == 'web') {
        console.log('This is a Web Browser View');
          this.toGetUserLocation();
          this.ToGetDeviceInfo();
      } else if (Capacitor.platform == 'android') {
          this.registerPush();
              this.ToGetDeviceInfo();
        console.log('This is an Android Platform');
      } else if (Capacitor.platform == 'ios') {
          this.registerPush();
              this.ToGetDeviceInfo();
        console.log('This is an ios Platform');
      }
    }

   async ToGetDeviceInfo() {
      // To Get User's Device Information
      const DeviceInfo = await Device.getInfo().then((resp) => {
        console.log('resp:',resp);
      });
      console.log('DeviceInfo:',DeviceInfo);
      this.storageservice.setStorage('DeviceInfo',DeviceInfo);
    }

    async toGetUserLocation() {
      // To Get User's Current Location
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log('resp:',resp);
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }

    private registerPush() {
      PushNotifications.requestPermission().then((permission) => {
        if (permission.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // No permission for push granted
        }
      });

      PushNotifications.addListener(
        'registration',
        (token: PushNotificationToken) => {
          console.log('My token: ' + JSON.stringify(token));
          this.storageservice.setStorage('DeviceToken',token);
        }
      );

      PushNotifications.addListener('registrationError', (error: any) => {
        console.log('Error: ' + JSON.stringify(error));
      });
   
      PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: PushNotification) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
      );
   
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        async (notification: PushNotificationActionPerformed) => {
          const data = notification.notification.data;
          console.log('Action performed: ' + JSON.stringify(notification.notification));
          if (data.detailsId) {
            this.router.navigateByUrl(`/home/${data.detailsId}`);
          }
        }
      );
    }

}
