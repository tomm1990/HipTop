import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicSetComponent } from './music-set.component';

describe('MusicSetComponent', () => {
  let component: MusicSetComponent;
  let fixture: ComponentFixture<MusicSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
