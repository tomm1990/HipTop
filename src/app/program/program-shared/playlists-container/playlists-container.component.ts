import { Component, OnInit } from '@angular/core';
import {Album} from "../../../app-shared/model/album.model";
import {AlbumService} from "../../../app.AlbumService";
import { ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-playlists-container',
  templateUrl: 'playlists-container.component.html',
  styleUrls: ['playlists-container.component.css']
})
export class PlaylistsContainerComponent implements OnInit {
  albums: Album[] = [];
  ganre:string;
  constructor(private AlService:AlbumService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params:Params)=>{
        this.ganre =  params['ganre2'];
        console.log('id param' + params['ganre2']);
      }
    );
    this.AlService.getAlbum(2,this.ganre).then((album: Album[])=>{
    this.albums = album;
  });





  }

}
