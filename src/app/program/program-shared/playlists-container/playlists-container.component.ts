import { Component, OnInit } from '@angular/core';
import {Album} from "../../../app-shared/model/album.model";
import {AlbumService} from "../../../app.AlbumService";

@Component({
  selector: 'app-playlists-container',
  templateUrl: 'playlists-container.component.html',
  styleUrls: ['playlists-container.component.css']
})
export class PlaylistsContainerComponent implements OnInit {

  albums: Album[] = []
  constructor(private AlService:AlbumService) { }

  ngOnInit() {
    this.AlService.getAlbum().then((album: Album[])=>{
      this.albums = album;
    });
  }

}
