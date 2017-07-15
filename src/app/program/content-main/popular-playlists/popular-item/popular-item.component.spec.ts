import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularItemComponent } from './popular-item.component';

describe('PopularItemComponent', () => {
  let component: PopularItemComponent;
  let fixture: ComponentFixture<PopularItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
