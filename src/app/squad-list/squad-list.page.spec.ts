import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SquadListPage } from './squad-list.page';

describe('SquadListPage', () => {
  let component: SquadListPage;
  let fixture: ComponentFixture<SquadListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SquadListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
