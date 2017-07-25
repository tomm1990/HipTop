import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreRatingComponent } from './genre-rating.component';

describe('GenreRatingComponent', () => {
  let component: GenreRatingComponent;
  let fixture: ComponentFixture<GenreRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreRatingComponent ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(GenreRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
