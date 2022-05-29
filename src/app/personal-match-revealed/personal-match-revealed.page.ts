import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-personal-match-revealed',
  templateUrl: './personal-match-revealed.page.html',
  styleUrls: ['./personal-match-revealed.page.scss'],
})
export class PersonalMatchRevealedPage implements OnInit {
  data: any;
  type: any;
  test = [
    {
      name: 'abc',
      likes: 1000
    },
    {
      name: 'abc',
      likes: 1000
    },
    {
      name: 'abc',
      likes: 1000
    },
    {
      name: 'abc',
      likes: 1000
    }
  ];

  test2 = [
    {
      name: 'abc',
      likes: 1000
    },
    {
      name: 'abc',
      likes: 1000
    },
    {
      name: 'abc',
      likes: 1000
    },
    {
      name: 'abc',
      likes: 1000
    }
  ];

  constructor(private common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        this.type = this.common.router.getCurrentNavigation().extras.state.type;
        console.log('Data:', this.data);
        console.log('Data type:', this.type);

      }
    });

  }

  ngOnInit() {
  }

}
