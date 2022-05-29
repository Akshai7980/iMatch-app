import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenMatchCommentsPage } from './open-match-comments.page';

describe('OpenMatchCommentsPage', () => {
  let component: OpenMatchCommentsPage;
  let fixture: ComponentFixture<OpenMatchCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMatchCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMatchCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
