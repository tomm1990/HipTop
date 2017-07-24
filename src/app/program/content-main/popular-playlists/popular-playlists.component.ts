import { Component, OnInit } from '@angular/core';
import {Album} from "../../../app-shared/model/album.model";
import {AlbumService} from "../../../app.AlbumService";
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-popular-playlists',
  templateUrl: 'popular-playlists.component.html',
  styleUrls: ['popular-playlists.component.css']
})
export class PopularPlaylistsComponent implements OnInit {

  albums: Album[] = []
  ganre: string;
  constructor(private AlService:AlbumService, private route:ActivatedRoute) { }

    ngOnInit() {

      this.route.params.subscribe(
        (params:Params)=>{
          this.ganre =  params['ganre1'];
          console.log('id param' + params['ganre1']);
        }
      );

      console.log("length " + this.albums.length);
      if(this.albums.length==0){
      this.AlService.getAlbum(8,'Pop').then((album: Album[])=>{
        this.albums = album;
          console.log("length " + this.albums.length);
      });
    }
      console.log("length" + this.albums.length);
    }

}
