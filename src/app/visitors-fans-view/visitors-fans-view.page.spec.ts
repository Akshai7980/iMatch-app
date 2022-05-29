import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsFansViewPage } from './visitors-fans-view.page';

describe('VisitorsFansViewPage', () => {
  let component: VisitorsFansViewPage;
  let fixture: ComponentFixture<VisitorsFansViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsFansViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsFansViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
