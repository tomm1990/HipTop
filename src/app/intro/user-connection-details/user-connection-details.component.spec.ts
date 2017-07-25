import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserConnectionDetailsComponent } from './user-connection-details.component';

describe('UserConnectionDetailsComponent', () => {
  let component: UserConnectionDetailsComponent;
  let fixture: ComponentFixture<UserConnectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConnectionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
