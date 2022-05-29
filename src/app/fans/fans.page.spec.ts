import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FansPage } from './fans.page';

describe('FansPage', () => {
  let component: FansPage;
  let fixture: ComponentFixture<FansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
