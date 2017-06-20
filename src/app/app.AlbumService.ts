import {EventEmitter,Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Album} from "./model/album.model";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AlbumService{

    private albums:Album[] = [];
/*     new Album ("101",
     ["DJ X"],
     "Title",
     "urlSrc",
     ["like1","like2"],
     "genre",
     "../../assets/image/AlbumCover.png",
     ["com1","com2"],
     ["songid1","songid2"]),
     new Album ("101",
    ["DJ X"],
    "Title",
    "urlSrc",
    ["like1","like2"],
    "genre",
    "../../assets/image/AlbumCover.png",
    ["com1","com2"],
    ["songid1","songid2"]),
     new Album ("101",
    ["DJ X"],
    "Title",
    "urlSrc",
    ["like1","like2"],
    "genre",
    "../../assets/image/AlbumCover.png",
    ["com1","com2"],
    ["songid1","songid2"])
    ];
*/

    constructor(private http:Http){}
/*
    private getAlbumFromDB(){
      return this.http.post('https://hiptop.herokuapp.com/getAllAlbums ','')
      .subscribe(
        (response:Response)=>{
          console.log("albums1="+response.json());
        this.albums = response.json();

      }
    );
    }
*/

getAlbum():Promise <Album[]>{

  return this.http.post('https://hiptop.herokuapp.com/getAllAlbums','')
        .toPromise()
        .then(response => response.json() as Album[])
  .catch(err => err.json() as Album[]);
}

}
