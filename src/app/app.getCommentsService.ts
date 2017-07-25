import {EventEmitter,Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {User} from "./app-shared/model/User.model";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetArtistService{

    private artist:User = new User ("name",
         "title",
         "email",
         "pass",
         "type",
         [701,702],
         [1,2,3,4],
         "googleId",
         ["follow1","follow2","follow3","foolow4","follow5"],
         "../../assets/image/b371-b3f4-4b13-a949-e7c568491a5f.jpg",

       ["gunre1","gunre2"]);


         getArtist(id:number){
           return this.artist;
         }

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

  //  constructor(private http:Http){}
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


getAlbum():Promise <Album[]>{

  return this.http.post('https://hiptop.herokuapp.com/getAllAlbums','')
        .toPromise()
        .then(response => response.json() as Album[])
  .catch(err => err.json() as Album[]);
}
*/
}
