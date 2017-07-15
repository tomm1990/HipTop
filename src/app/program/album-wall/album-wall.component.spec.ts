import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumWallComponent } from './album-wall.component';

describe('AlbumWallComponent', () => {
  let component: AlbumWallComponent;
  let fixture: ComponentFixture<AlbumWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
