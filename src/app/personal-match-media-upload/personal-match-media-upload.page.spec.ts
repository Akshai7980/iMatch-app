import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalMatchMediaUploadPage } from './personal-match-media-upload.page';

describe('PersonalMatchMediaUploadPage', () => {
  let component: PersonalMatchMediaUploadPage;
  let fixture: ComponentFixture<PersonalMatchMediaUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalMatchMediaUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalMatchMediaUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
