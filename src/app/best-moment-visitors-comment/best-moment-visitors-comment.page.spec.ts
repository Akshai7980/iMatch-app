import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestMomentVisitorsCommentPage } from './best-moment-visitors-comment.page';

describe('BestMomentVisitorsCommentPage', () => {
  let component: BestMomentVisitorsCommentPage;
  let fixture: ComponentFixture<BestMomentVisitorsCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMomentVisitorsCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestMomentVisitorsCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
