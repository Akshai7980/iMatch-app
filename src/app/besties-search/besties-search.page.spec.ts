import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestiesSearchPage } from './besties-search.page';

describe('BestiesSearchPage', () => {
  let component: BestiesSearchPage;
  let fixture: ComponentFixture<BestiesSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiesSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestiesSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
