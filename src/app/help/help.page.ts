import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  showContactUs = false;
  showFeedback = false;

  constructor() { }

  ngOnInit() {
  }

  openContactUs(elementId: any) {
    this.showContactUs = !this.showContactUs;
    const y = document.getElementById(elementId).offsetTop - 123;
    console.log(y);

    this.content.scrollByPoint(0, y, 300);

  }

  openFeedback(elementId: any) {
    this.showFeedback = !this.showFeedback;

    // const y = document.getElementById(elementId).offsetTop;
    this.content.scrollToBottom();


  }

}
