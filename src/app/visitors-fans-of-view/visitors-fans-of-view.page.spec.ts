import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsFansOfViewPage } from './visitors-fans-of-view.page';

describe('VisitorsFansOfViewPage', () => {
  let component: VisitorsFansOfViewPage;
  let fixture: ComponentFixture<VisitorsFansOfViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsFansOfViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsFansOfViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
