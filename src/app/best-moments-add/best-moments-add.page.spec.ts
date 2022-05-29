import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestMomentsAddPage } from './best-moments-add.page';

describe('BestMomentsAddPage', () => {
  let component: BestMomentsAddPage;
  let fixture: ComponentFixture<BestMomentsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMomentsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestMomentsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
