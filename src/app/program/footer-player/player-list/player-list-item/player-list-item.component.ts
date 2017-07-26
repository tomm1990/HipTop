import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Song} from "../../../../app-shared/model/song.model";
import {PlayerDetailsComponent} from "../../player-details/player-details.component";

@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.css']
})
export class PlayerListItemComponent implements OnInit {
  @Input() songItem :Song;
  @Output() songSelected = new EventEmitter<Song>();

  constructor(private playerDetailsComponent :PlayerDetailsComponent ) {
    this.playerDetailsComponent = playerDetailsComponent;
  }

  ngOnInit() {

  }

  playThis(){
    this.songSelected.emit(this.songItem);
    // console.log(`playThis(${song.title})`);
  }

}
