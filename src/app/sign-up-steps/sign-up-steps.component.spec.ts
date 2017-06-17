import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStepsComponent } from './sign-up-steps.component';

describe('SignUpStepsComponent', () => {
  let component: SignUpStepsComponent;
  let fixture: ComponentFixture<SignUpStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
