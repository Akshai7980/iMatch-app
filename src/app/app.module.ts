import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { StorageService } from './services/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { ActionSheetController, NavController , PopoverController, ModalController } from '@ionic/angular';
import { LogoutPopoverPage } from './logout-popover/logout-popover.page';
import { ModalPage } from './modal/modal.page';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AjaxService } from './services/ajax.service';
import { IonicStorageModule } from '@ionic/storage';
// import { AngularFireModule } from '@angular/fire';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { Base64 } from '@ionic-native/base64/ngx';
import { WhatWouldIDoVisitorPipe } from './what-would-i-do-visitor.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent, WhatWouldIDoVisitorPipe ,LogoutPopoverPage, ModalPage],
  entryComponents: [ LogoutPopoverPage, ModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // AndroidPermissions,
    // IonicImageViewerModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    FileChooser,
    IOSFilePicker,
    FilePath,
    Camera,
    // Base64,
    TwitterConnect,
    GooglePlus,
    Geolocation,
    ActionSheetController,
    AndroidPermissions,
    NavController,
    PopoverController,
    ModalController,
    SocialSharing,
    PhotoViewer,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AjaxService,
    StorageService,
    File,
    ScreenOrientation,
    MediaCapture,
    FileTransfer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
