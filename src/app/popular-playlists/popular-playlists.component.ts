import { Component, OnInit } from '@angular/core';
import {Album} from "../model/album.model";
import {AlbumService} from "../app.AlbumService";

@Component({
  selector: 'app-popular-playlists',
  templateUrl: './popular-playlists.component.html',
  styleUrls: ['./popular-playlists.component.css']
})
export class PopularPlaylistsComponent implements OnInit {

  albums: Album[] = []

  constructor(private AlService:AlbumService) { }

    ngOnInit() {
      this.AlService.getAlbum().then((album: Album[])=>{
        this.albums = album;
      });
    }

}
