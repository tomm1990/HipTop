import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Song } from '../../app-shared/model/song.model';
import {AlbumService} from "../../app.AlbumService";

@Component({
  selector: 'app-genre-rating',
  templateUrl: 'genre-rating.component.html',
  styleUrls: ['genre-rating.component.css']
})
export class GenreRatingComponent implements OnInit {
@Output() changeMode = new EventEmitter<string>();
  songs: Song[];
  i:number=0;
  src:string ="https://www.youtube.com/embed/";
  genreRaited:string[]=[];
  ratingOver:string;
  constructor(private AlbuService:AlbumService) { }


  ngOnInit() {
    this.ratingOver="false";

    this.AlbuService.getSongsToRate()
    .then((song: Song[])=>{
       this.songs = song;
     });
  }

  onGoToMain(){
    this.AlbuService.changeAppState();
  }

  onGenreRated(rating:number){
    document.getElementById('iframe')
    this.ratingOver="true";

    if(this.i<5){

      if(rating>3){

        this.genreRaited.push(this.songs[this.i].genre);
      }
      else{

      }
      this.i+=1;
    }
    else{
      this.genreRaited.push('Soft Rock');
      this.genreRaited.push('Pop');
      this.ratingOver="true";
    }
  }

}
