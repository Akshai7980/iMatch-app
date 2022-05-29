import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LetterPage } from './letter.page';

describe('LetterPage', () => {
  let component: LetterPage;
  let fixture: ComponentFixture<LetterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LetterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
