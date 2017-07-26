import {Component, OnInit, Input, Output} from '@angular/core';
import {Album} from "../../../../app-shared/model/album.model";
import {AlbumToPlayComponent} from "../../../../app-shared/album-to-play/album-to-play.component";
import {AlbumWall} from "../../../../app-shared/model/albumWall.model";

@Component({
  selector: 'app-popular-item',
  templateUrl: 'popular-item.component.html',
  styleUrls: ['popular-item.component.css']
})
export class PopularItemComponent implements OnInit {
  @Input() @Output() album : AlbumWall;

  constructor() {

  }

  ngOnInit() {
  }


}
