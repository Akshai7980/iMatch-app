import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopHundredPage } from './top-hundred.page';

describe('TopHundredPage', () => {
  let component: TopHundredPage;
  let fixture: ComponentFixture<TopHundredPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopHundredPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopHundredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
