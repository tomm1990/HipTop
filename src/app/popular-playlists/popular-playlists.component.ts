import { Component, OnInit } from '@angular/core';
import {Album} from "../model/album.model";

@Component({
  selector: 'app-popular-playlists',
  templateUrl: './popular-playlists.component.html',
  styleUrls: ['./popular-playlists.component.css']
})
export class PopularPlaylistsComponent implements OnInit {

  albums: Album[] = [
    new Album(
         "101",
        ["DJ X"],
        "Title",
        "urlSrc",
        ["like1","like2"],
        "genre",
        "../../assets/image/AlbumCover.png",
        ["com1","com2"],
        ["songid1","songid2"]
    ),
    new Album(
      "101",
      ["DJ X"],
      "Title",
      "urlSrc",
      ["like1","like2"],
      "genre",
      "../../assets/image/AlbumCover.png",
      ["com1","com2"],
      ["songid1","songid2"]
    ),
    new Album(
      "101",
      ["DJ X"],
      "Title",
      "urlSrc",
      ["like1","like2"],
      "genre",
      "../../assets/image/AlbumCover.png",
      ["com1","com2"],
      ["songid1","songid2"]
    ),
    new Album(
      "101",
      ["DJ X"],
      "Title",
      "urlSrc",
      ["like1","like2"],
      "genre",
      "../../assets/image/AlbumCover.png",
      ["com1","com2"],
      ["songid1","songid2"]
    )
  ];

  constructor() { }

  ngOnInit() {
  }

}
