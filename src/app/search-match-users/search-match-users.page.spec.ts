import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMatchUsersPage } from './search-match-users.page';

describe('SearchMatchUsersPage', () => {
  let component: SearchMatchUsersPage;
  let fixture: ComponentFixture<SearchMatchUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMatchUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMatchUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
