import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalMatchRevealedPage } from './personal-match-revealed.page';

describe('PersonalMatchRevealedPage', () => {
  let component: PersonalMatchRevealedPage;
  let fixture: ComponentFixture<PersonalMatchRevealedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalMatchRevealedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalMatchRevealedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
