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
  genreRaited:string[]=[];
  ratingOver:string;
  constructor(private AlbuService:AlbumService) { }

  ngOnInit() {
    this.ratingOver="false";
    this.songs = this.AlbuService.getSongsToRate();
    console.log(this.songs);
  }

  onGoToMain(){
    console.log('go to main');
    this.AlbuService.changeAppState();
    //this.changeMode.emit("program");
  }

  onGenreRated(rating:number){
    //document.getElementById('iframe').src='https://www.youtube.com/embed/kJQP7kiw5Fk?autoplay=true';
    if(this.i<5){
      if(rating>3){
        console.log(rating + ' gt 3');
        this.genreRaited.push(this.songs[this.i].genre);
      }
      else{
        console.log(rating + ' lt 3');
      }
      console.log(this.i + ' ' + rating);
      console.log(this.ratingOver);
      console.log(this.songs[this.i].genre);
      console.log('array ' + this.genreRaited);
      this.i+=1;
    }
    else{
      this.genreRaited.push('Soft Rock');
      this.genreRaited.push('Pop');
      this.ratingOver="true";
      console.log(this.ratingOver);
    }
  }

}
