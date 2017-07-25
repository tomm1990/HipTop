import {EventEmitter,Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Album} from "./app-shared/model/album.model";
import {AlbumWall} from "./app-shared/model/albumWall.model";
import {Song} from "./app-shared/model/song.model";
import {CommentData} from "./app-shared/model/commentData.model";
import {User} from "./app-shared/model/user.model";
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
  private songs:Song[] = [new Song(222,["author1","author2"],"title",
"../../assets/image/AlbumCover.png","../../assets/image/AlbumCover.png",
"4","Britpop"),new Song(222,["author1","author2"],"title",
"../../assets/image/AlbumCover.png","../../assets/image/AlbumCover.png",
"4","Pop/Rock"),new Song(222,["author1","author2"],"title",
"../../assets/image/AlbumCover.png","../../assets/image/AlbumCover.png",
"4","Soft Rock"),new Song(222,["author1","author2"],"title",
"../../assets/image/AlbumCover.png","../../assets/image/AlbumCover.png",
"4","Teen Pop"),new Song(222,["author1","author2"],"title",
"../../assets/image/AlbumCover.png","../../assets/image/AlbumCover.png",
"4","Pop")];

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

         getAlbumById(id:string):Promise <AlbumWall>{
           return this.http.post('https://hiptop.herokuapp.com/getAlbumByIdHybrid',{albumId:id})
                 .toPromise()
                 .then(response => response.json() as AlbumWall)
           .catch(err => err.json() as AlbumWall);
           //this.albumWall.comment[0].date=new Date(Date.now()-aDay)
          // console.log('in server' + id);
           //return this.albumWall;
         }

getAlbum(limit:number, genre:string):Promise <Album[]>{
  return this.http.post('https://hiptop.herokuapp.com/getAllAlbumsConclusion',{limit:limit,genre:genre})
        .toPromise()
        .then(response => response.json() as Album[])
  .catch(err => err.json() as Album[]);
}

insertCommentToDB(userId:string,message:string,albumId:string):Promise <string>{
  console.log(`userId -> ${userId}`);
  console.log(`message -> ${message}`);
  console.log(`albumId -> ${albumId}`);
  return this.http.post('https://hiptop.herokuapp.com/addCommentToAlbum',{userId:userId,message:message,albumId:albumId})
        .toPromise()
        .then(response => response.json())
  .catch(err => err.json());
}

insertLikeToDB(email:string,albumid:string){
  return this.http.post('https://hiptop.herokuapp.com/addLikeToAlbum',{email:'edsheeran@edsheeran.com',albumid:albumid})
        .toPromise()
        .then(response => response.json() as string)
  .catch(err => err.json() as string);
}

changeAppState(){
  //return "program";
}

getSongsToRate():Promise <Song[]> {
  return this.http.post('https://hiptop.herokuapp.com/getRandomFromGenre',{})
        .toPromise()
        .then(response => response.json() as Song[])
  .catch(err => err.json() as Song[]);

  //return this.songs;
}
}
