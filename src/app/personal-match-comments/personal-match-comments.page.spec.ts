import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalMatchCommentsPage } from './personal-match-comments.page';

describe('PersonalMatchCommentsPage', () => {
  let component: PersonalMatchCommentsPage;
  let fixture: ComponentFixture<PersonalMatchCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalMatchCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalMatchCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
