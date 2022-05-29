import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FunnyPage } from './funny.page';

describe('FunnyPage', () => {
  let component: FunnyPage;
  let fixture: ComponentFixture<FunnyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FunnyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
