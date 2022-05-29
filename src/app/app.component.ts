import { Component } from '@angular/core';
import { LogoutPopoverPage } from './logout-popover/logout-popover.page';
import { CommonService } from './services/common.service';
// import { StorageService } from './services/storage.service';
import { AjaxService } from './services/ajax.service';
import { ModalPage } from './modal/modal.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public selectedIndex = 0;
  
  public appPages = [
    {
      title: 'Settings',
      url: '/settings',
      img: '../../assets/icon/menu/settings.png'
    },
    // {
    //   title: 'Saved',
    //   // url: '/',
    //   img: '../../assets/icon/menu/save.png'
    // },
    // {
    //   title: 'Archive',
    //   // url: '/',
    //   img: '../../assets/icon/menu/archive.png'
    // },
    // {
    //   title: 'Customize',
    //   // url: '/',
    //   img: '../../assets/icon/menu/customize.png'
    // },
    // {
    //   title: 'iMATCH',
    //   // url: '/',
    //   img: '../../assets/icon/menu/imatch.png'
    // },
    // {
    //   title: 'Activities',
    //   // url: '/',
    //   img: '../../assets/icon/menu/activities.png'
    // },
    {
      title: 'Messages',
      url: 'chat',
      img: '../../assets/icon/menu/messages.png'
    },
    {
      title: 'About Us',
      url: '/tabs/tab8/about-us',
      img: '../../assets/icon/menu/about.png'
    },
    {
      title: 'Help',
      url: '/tabs/tab8/help',
      img: '../../assets/icon/menu/help.png'
    },
    {
      title: 'FAQ',
      url: '/tabs/tab8/faq',
      img: '../../assets/icon/menu/faq.png'
    },
    {
      title: 'Privacy Policy',
      url: '/tabs/tab8/privacy-policy',
      img: '../../assets/icon/menu/privacy.png'
    }
  ];
  userDetails: any;

  constructor(
    private common: CommonService,
    private AjxService: AjaxService,
    private platform: Platform,
    public storage: Storage,
    private splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private navCtrl: NavController,
    private menu: MenuController
  ) {
    this.menu.swipeGesture(false);
    this.initializeApp();
  }

  initializeApp() {

    if(this.platform.is("capacitor" || "cordova")) {

      this.platform.ready().then(() => {
        // this.statusBar.styleDefault();
        this.AjxService.initPush();
          this.checkUserDetails();
            this.splashScreen.hide();
  
              this.common.screenOrientation.lock(this.common.screenOrientation.ORIENTATIONS.PORTRAIT);
                console.log(this.common.screenOrientation.type);
  
      });

      // this.AjxService.initPush();

    } else {
      console.log('This is a browser view');

        this.platform.ready().then(() => {
          
          this.checkUserDetails();
      });
    }

  }

  checkUserDetails() {
    console.log('Checking User Details ....');
        this.storage.get('userDetails').then((val) => {
          console.log('userDetails:',val);
          this.userDetails = val;
            if (val) {
            this.common.statusBar.backgroundColorByHexString('#707072');
              this.navCtrl.navigateRoot(['tabs/tab6']);
            } else {
              this.statusBar.styleDefault();
                this.common.navCtrl.navigateRoot(['landing']);
            }
        });
      }

  // initializeApp() {
  //   this.common.platform.ready().then(() => {
  //   this.common.platform.platforms();
  //   this.common.splashScreen.hide();
  //   this.AjxService.initPush();
  //   this.storageservice.storage.get('userDetails')
  //   .then((val)=> {
  //     if(val) {
  //      this.common.statusBar.backgroundColorByHexString('#707072');
  //       this.common.navCtrl.navigateRoot('tabs/tab6');
  //     }else{
  //       this.common.navCtrl.navigateRoot('login');
  //     }
  //   });
  //     if (this.common.platform.is("capacitor"||"cordova")) {
  //       this.common.screenOrientation.lock(this.common.screenOrientation.ORIENTATIONS.PORTRAIT);
  //       console.log(this.common.screenOrientation.type);
  //     }
  //     else {
  //       console.log('This is a browser view');
  //     }

  //   });
  // }

  openPage(i: string) {
    const route = this.appPages[i].url;
    this.common.router.navigate([route]);
  }

  async reportIssue() {
    const modal = await this.common.modalController.create({
      component: ModalPage,
      componentProps: {
        heading: 'REPORT AN ISSUE',
        content: [{
          title: 'General Feedback',
          description: 'Tell us about your iMatch Experience'
        },
        {
          title: 'Payment Issue',
          description: 'Need help with iMatch payment? Contact Us'
        },
        {
          title: 'Something Isn\'t working',
          description: 'Let us know about broken feature'
        },
        {
          title: 'Abusive Content',
          description: 'This includes contents that are harmful, spam or a policy violation'
        }
      ]
      },
      backdropDismiss: false,
      cssClass: 'menu-modal'
    });
    return await modal.present();
  }

  async gotoLogoutPopover() {
    const popover = await this.common.popoverController.create({
      component: LogoutPopoverPage,
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      animated: false,
      translucent: true
    });
    return await popover.present();
  }

}
