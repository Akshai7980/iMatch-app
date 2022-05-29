import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoutPopoverPage } from './logout-popover.page';

describe('LogoutPopoverPage', () => {
  let component: LogoutPopoverPage;
  let fixture: ComponentFixture<LogoutPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
