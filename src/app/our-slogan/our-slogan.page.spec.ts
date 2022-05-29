import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OurSloganPage } from './our-slogan.page';

describe('OurSloganPage', () => {
  let component: OurSloganPage;
  let fixture: ComponentFixture<OurSloganPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurSloganPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OurSloganPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
