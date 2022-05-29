import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenMatchPage } from './open-match.page';

describe('OpenMatchPage', () => {
  let component: OpenMatchPage;
  let fixture: ComponentFixture<OpenMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
