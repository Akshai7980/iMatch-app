import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorsBestiesViewPage } from './visitors-besties-view.page';

describe('VisitorsBestiesViewPage', () => {
  let component: VisitorsBestiesViewPage;
  let fixture: ComponentFixture<VisitorsBestiesViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsBestiesViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorsBestiesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
