import {Component, OnInit, Input, Injectable } from '@angular/core';
import {AlbumToPlayComponent} from "../../app-shared/album-to-play/album-to-play.component";
import {AlbumWall} from "../../app-shared/model/albumWall.model";
import {Song} from "../../app-shared/model/song.model";
import {CurrentSongService} from "../../app-shared/current-song";

@Component({
  selector: 'app-footer-player',
  templateUrl: 'footer-player.component.html',
  styleUrls: ['footer-player.component.css']
})

@Injectable()
export class FooterPlayerComponent implements OnInit {
  @Input() albumInFooter : AlbumWall;
  @Input() currentSong : Song;

  constructor(private albumToPlayComponent: AlbumToPlayComponent,
              private currentSongService : CurrentSongService) {
    this.albumToPlayComponent = albumToPlayComponent;
    this.currentSongService = currentSongService;

    this.albumToPlayComponent.getEmittedValue()
      .subscribe(item => {
        this.albumInFooter = item;
        console.log(`albumInFooter.title -> ${this.albumInFooter.title}`);
      });

    this.currentSongService.getEmittedValue()
      .subscribe(item => {
        this.currentSong = item ? item : new Song('a',1,['Pick'],'Some Song','','','','');
        console.log(`albumInFooter.title -> ${this.currentSong.title}`);
      });

  }

  onClick(){

    this.albumToPlayComponent.getEmittedValue()
      .subscribe(item => {
        this.albumInFooter = item;
        console.log(`albumInFooter.title -> ${this.albumInFooter.title}`);
      });

    this.currentSongService.getEmittedValue()
      .subscribe(item => {
        this.currentSong = item ? item : new Song('a',1,['Pick'],'Some Song','','','','');
        console.log(`albumInFooter.title -> ${this.currentSong.title}`);
      });

  }

  ngOnInit() {

  }

  onChangeSong(next:Song){
    console.log(`onChangeSong(${next.title})`);

  }

  changeName() {
    // this.albumToPlayComponent.change();
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
