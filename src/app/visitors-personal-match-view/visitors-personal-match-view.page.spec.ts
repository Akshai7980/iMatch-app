import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsPersonalMatchViewPage } from './visitors-personal-match-view.page';

describe('VisitorsPersonalMatchViewPage', () => {
  let component: VisitorsPersonalMatchViewPage;
  let fixture: ComponentFixture<VisitorsPersonalMatchViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsPersonalMatchViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsPersonalMatchViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
