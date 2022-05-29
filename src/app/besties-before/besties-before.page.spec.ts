import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestiesBeforePage } from './besties-before.page';

describe('BestiesBeforePage', () => {
  let component: BestiesBeforePage;
  let fixture: ComponentFixture<BestiesBeforePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiesBeforePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestiesBeforePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
