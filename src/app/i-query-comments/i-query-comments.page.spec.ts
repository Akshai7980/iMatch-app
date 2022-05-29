import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IQueryCommentsPage } from './i-query-comments.page';

describe('IQueryCommentsPage', () => {
  let component: IQueryCommentsPage;
  let fixture: ComponentFixture<IQueryCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IQueryCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IQueryCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
