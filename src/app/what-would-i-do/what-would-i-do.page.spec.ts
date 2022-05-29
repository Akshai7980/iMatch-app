import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhatWouldIDoPage } from './what-would-i-do.page';

describe('WhatWouldIDoPage', () => {
  let component: WhatWouldIDoPage;
  let fixture: ComponentFixture<WhatWouldIDoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWouldIDoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatWouldIDoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
