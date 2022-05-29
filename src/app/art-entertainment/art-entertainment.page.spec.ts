import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtEntertainmentPage } from './art-entertainment.page';

describe('ArtEntertainmentPage', () => {
  let component: ArtEntertainmentPage;
  let fixture: ComponentFixture<ArtEntertainmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtEntertainmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtEntertainmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
