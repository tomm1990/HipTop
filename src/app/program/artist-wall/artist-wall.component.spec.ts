import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistWallComponent } from './artist-wall.component';

describe('ArtistWallComponent', () => {
  let component: ArtistWallComponent;
  let fixture: ComponentFixture<ArtistWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
