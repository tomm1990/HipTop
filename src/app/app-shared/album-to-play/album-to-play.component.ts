import {Component, Injectable, EventEmitter, Output} from '@angular/core';
import {AlbumWall} from "../model/albumWall.model";

@Component({
  selector: 'app-album-to-play',
  templateUrl: './album-to-play.component.html',
  styleUrls: ['./album-to-play.component.css']
})

@Injectable()
export class AlbumToPlayComponent {
  @Output() albumToPlayEventEmitter : EventEmitter<AlbumWall> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  change(album:AlbumWall) {
    // for(let i=0 ; i< album.songId.length ; i++){
    //   console.log(` ${album.songId[i].title}`);
    //
    // }
    this.albumToPlayEventEmitter.emit(album);
  }

  getEmittedValue() {
    return this.albumToPlayEventEmitter;
  }


}
