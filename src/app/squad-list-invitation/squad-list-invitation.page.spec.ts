import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SquadListInvitationPage } from './squad-list-invitation.page';

describe('SquadListInvitationPage', () => {
  let component: SquadListInvitationPage;
  let fixture: ComponentFixture<SquadListInvitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadListInvitationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SquadListInvitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
