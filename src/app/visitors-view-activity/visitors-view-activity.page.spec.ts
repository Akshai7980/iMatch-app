import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsViewActivityPage } from './visitors-view-activity.page';

describe('VisitorsViewActivityPage', () => {
  let component: VisitorsViewActivityPage;
  let fixture: ComponentFixture<VisitorsViewActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsViewActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsViewActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
