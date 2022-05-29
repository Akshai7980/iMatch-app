import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IQuery2CommentsPage } from './i-query2-comments.page';

describe('IQuery2CommentsPage', () => {
  let component: IQuery2CommentsPage;
  let fixture: ComponentFixture<IQuery2CommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IQuery2CommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IQuery2CommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
