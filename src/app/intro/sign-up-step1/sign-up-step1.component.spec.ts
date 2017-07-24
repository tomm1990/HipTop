import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStep1Component } from './sign-up-step1.component';

describe('SignUpStep1Component', () => {
  let component: SignUpStep1Component;
  let fixture: ComponentFixture<SignUpStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
