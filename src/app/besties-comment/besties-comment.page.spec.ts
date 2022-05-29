import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestiesCommentPage } from './besties-comment.page';

describe('BestiesCommentPage', () => {
  let component: BestiesCommentPage;
  let fixture: ComponentFixture<BestiesCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiesCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestiesCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
