import {Component, OnInit, Input, Injectable, Output, EventEmitter} from '@angular/core';
import {AlbumToPlayComponent} from "../../../app-shared/album-to-play/album-to-play.component";
import {AlbumWall} from "../../../app-shared/model/albumWall.model";
import {Song} from "../../../app-shared/model/song.model";
import {CurrentSongService} from "../../../app-shared/current-song";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})

@Injectable()
export class PlayerListComponent implements OnInit {
  @Output() songSelected = new EventEmitter<Song>();
  albumInFooter:AlbumWall;

  constructor(private albumToPlayComponent: AlbumToPlayComponent,
            private currentSongService : CurrentSongService) {
    this.albumToPlayComponent = albumToPlayComponent;
    this.currentSongService = currentSongService;

    this.albumToPlayComponent.getEmittedValue()
      .subscribe(item => {
        this.albumInFooter = item;
        this.songSelected.emit(item.songId[0]);
        //console.log(`PlayerListComponent:: albumListObject.title -> ${this.albumInFooter.title}`);
      });
  }

  ngOnInit() {
    console.log(`PlayerListComponent :: ngOnInit()`);
  }

  changeName() {

  }

  songChoose(song:Song){
    console.log(`songChoose(${song.title})`);
    this.songSelected.emit(song);

  }

  play(){
    console.log(`play()`);
  }

  stop(){
    console.log(`stop()`);
  }

  next(){
    console.log(`next()`);
  }

  prev(){
    console.log(`prev()`);
  }
}
