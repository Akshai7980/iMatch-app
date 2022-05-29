import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SquadSearchPage } from './squad-search.page';

describe('SquadSearchPage', () => {
  let component: SquadSearchPage;
  let fixture: ComponentFixture<SquadSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SquadSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
