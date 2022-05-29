import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoodiesPage } from './goodies.page';

describe('GoodiesPage', () => {
  let component: GoodiesPage;
  let fixture: ComponentFixture<GoodiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoodiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
