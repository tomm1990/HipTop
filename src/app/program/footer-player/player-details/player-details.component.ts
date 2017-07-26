import {Component, OnInit, Input, Injectable} from '@angular/core';
import {Song} from "../../../app-shared/model/song.model";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})

@Injectable()
export class PlayerDetailsComponent implements OnInit {
  @Input() currentSong : Song;

  player: YT.Player;
  // private id: string = "pBI3lc18k8Q";
  // id: string;

  savePlayer (player) {
    console.log(`PlayerDetailsComponent - savePlayer() :: song mLab ID -> ${this.currentSong.urlSrc}`);
    //this.id = this.currentSong.urlSrc;
    this.player = player;
    console.log('player instance', player)
  }

  onStateChange(event){
    console.log(`PlayerDetailsComponent - onStateChange() :: song mLab ID -> ${this.currentSong.urlSrc}`);
    console.log('player state', event.data);
  }

  constructor() {

  }

  ngOnInit() {
    console.log(`PlayerDetailsComponent - ngOnInit() :: song mLab ID -> ${this.currentSong.urlSrc}`);
  }


  play(){
    this.player.playVideo();
    console.log(`play()`);
  }

  pause(){
    this.player.pauseVideo();
    console.log(`stop()`);
  }

  next(){
    console.log(`next()`);
  }

  prev(){
    console.log(`prev()`);
  }

}
