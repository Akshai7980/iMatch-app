import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhatWouldIDoVisitorPage } from './what-would-i-do-visitor.page';

describe('WhatWouldIDoVisitorPage', () => {
  let component: WhatWouldIDoVisitorPage;
  let fixture: ComponentFixture<WhatWouldIDoVisitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWouldIDoVisitorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatWouldIDoVisitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
