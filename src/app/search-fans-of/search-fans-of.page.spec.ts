import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchFansOfPage } from './search-fans-of.page';

describe('SearchFansOfPage', () => {
  let component: SearchFansOfPage;
  let fixture: ComponentFixture<SearchFansOfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFansOfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFansOfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
