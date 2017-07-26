import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumToPlayComponent } from './album-to-play.component';

describe('AlbumToPlayComponent', () => {
  let component: AlbumToPlayComponent;
  let fixture: ComponentFixture<AlbumToPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumToPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
