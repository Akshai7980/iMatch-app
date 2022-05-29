import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsOngoingMatchPage } from './visitors-ongoing-match.page';

describe('VisitorsOngoingMatchPage', () => {
  let component: VisitorsOngoingMatchPage;
  let fixture: ComponentFixture<VisitorsOngoingMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsOngoingMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsOngoingMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
