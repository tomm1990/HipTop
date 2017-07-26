import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: 'music-player.component.html',
  styleUrls: ['music-player.component.css']
})

export class MusicPlayerComponent implements OnInit {
timer:string;
  constructor() { }

  ngOnInit() {
    this.timer="3:24";
  }




}
