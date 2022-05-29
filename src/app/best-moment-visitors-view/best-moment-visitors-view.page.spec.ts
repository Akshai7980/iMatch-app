import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestMomentVisitorsViewPage } from './best-moment-visitors-view.page';

describe('BestMomentVisitorsViewPage', () => {
  let component: BestMomentVisitorsViewPage;
  let fixture: ComponentFixture<BestMomentVisitorsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMomentVisitorsViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestMomentVisitorsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
