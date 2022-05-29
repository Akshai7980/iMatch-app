import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {

  t = 'When i went to France with my mom';

  constructor() { }

  ngOnInit() {
    if (this.t.length > 42) {
      this.t = this.t.substring(0, 42) + '...';

    }
  }

}
