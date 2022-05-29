import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestMomentCommentPage } from './best-moment-comment.page';

describe('BestMomentCommentPage', () => {
  let component: BestMomentCommentPage;
  let fixture: ComponentFixture<BestMomentCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMomentCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestMomentCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
