import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestiesPage } from './besties.page';

describe('BestiesPage', () => {
  let component: BestiesPage;
  let fixture: ComponentFixture<BestiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
