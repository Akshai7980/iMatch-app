import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRejectBestiesPage } from './add-reject-besties.page';

describe('AddRejectBestiesPage', () => {
  let component: AddRejectBestiesPage;
  let fixture: ComponentFixture<AddRejectBestiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRejectBestiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRejectBestiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
