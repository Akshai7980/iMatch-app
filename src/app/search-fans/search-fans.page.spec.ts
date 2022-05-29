import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchFansPage } from './search-fans.page';

describe('SearchFansPage', () => {
  let component: SearchFansPage;
  let fixture: ComponentFixture<SearchFansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
