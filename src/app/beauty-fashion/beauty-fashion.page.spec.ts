import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeautyFashionPage } from './beauty-fashion.page';

describe('BeautyFashionPage', () => {
  let component: BeautyFashionPage;
  let fixture: ComponentFixture<BeautyFashionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyFashionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeautyFashionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
