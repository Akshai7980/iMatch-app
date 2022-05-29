import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestiesActionsPage } from './besties-actions.page';

describe('BestiesActionsPage', () => {
  let component: BestiesActionsPage;
  let fixture: ComponentFixture<BestiesActionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiesActionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestiesActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
