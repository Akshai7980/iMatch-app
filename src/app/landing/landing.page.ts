import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {
    this.common.menu.swipeGesture(false);
  }

  login() {
    this.common.router.navigate(['/login']);
  }
  signUp() {
    this.common.router.navigate(['/sign-up']);
  }

}
