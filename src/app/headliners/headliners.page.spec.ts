import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeadlinersPage } from './headliners.page';

describe('HeadlinersPage', () => {
  let component: HeadlinersPage;
  let fixture: ComponentFixture<HeadlinersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadlinersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlinersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
