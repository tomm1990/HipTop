import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistsContainerComponent } from './playlists-container.component';

describe('PlaylistsContainerComponent', () => {
  let component: PlaylistsContainerComponent;
  let fixture: ComponentFixture<PlaylistsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
