import {Injectable, EventEmitter, Output} from '@angular/core';
import {Song} from "./model/song.model";

@Injectable()
export class CurrentSongService {
  currentSong = new EventEmitter<Song>();

  constructor() { }

  ngOnInit() {

  }

  change(song:Song) {
    this.currentSong.next(song);
  }

  getEmittedValue() {
    return this.currentSong;
  }
}
