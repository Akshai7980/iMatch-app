import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FansOfPage } from './fans-of.page';

describe('FansOfPage', () => {
  let component: FansOfPage;
  let fixture: ComponentFixture<FansOfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FansOfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FansOfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
