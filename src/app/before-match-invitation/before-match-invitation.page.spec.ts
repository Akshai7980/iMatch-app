import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeforeMatchInvitationPage } from './before-match-invitation.page';

describe('BeforeMatchInvitationPage', () => {
  let component: BeforeMatchInvitationPage;
  let fixture: ComponentFixture<BeforeMatchInvitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeMatchInvitationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeforeMatchInvitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
