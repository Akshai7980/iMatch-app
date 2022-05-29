import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestMomentsPage } from './best-moments.page';

describe('BestMomentsPage', () => {
  let component: BestMomentsPage;
  let fixture: ComponentFixture<BestMomentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMomentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestMomentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
