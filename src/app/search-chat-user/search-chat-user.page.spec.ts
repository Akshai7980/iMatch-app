import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchChatUserPage } from './search-chat-user.page';

describe('SearchChatUserPage', () => {
  let component: SearchChatUserPage;
  let fixture: ComponentFixture<SearchChatUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChatUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchChatUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
