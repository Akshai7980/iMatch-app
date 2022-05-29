import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalMatchPage } from './personal-match.page';

describe('PersonalMatchPage', () => {
  let component: PersonalMatchPage;
  let fixture: ComponentFixture<PersonalMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
