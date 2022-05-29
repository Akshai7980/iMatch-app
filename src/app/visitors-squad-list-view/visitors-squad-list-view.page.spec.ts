import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsSquadListViewPage } from './visitors-squad-list-view.page';

describe('VisitorsSquadListViewPage', () => {
  let component: VisitorsSquadListViewPage;
  let fixture: ComponentFixture<VisitorsSquadListViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsSquadListViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsSquadListViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
