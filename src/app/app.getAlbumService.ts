import {EventEmitter,Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AlbumWall} from "./app-shared/model/albumWall.model";
import {CommentData} from "./app-shared/model/commentData.model";
import {Song} from "./app-shared/model/song.model";
import {User} from "./app-shared/model/user.model";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetAlbumService{
/*
    private albumWall:AlbumWall = new AlbumWall ("101",
         [new User ("name1",
              "title",
              "email",
              "pass",
              "type",
              [701,702],
              [1,2,3,4],
              "googleId",
              ["follow1","follow2","follow3","foolow4","follow5"],
              "../../assets/image/b371-b3f4-4b13-a949-e7c568491a5f.jpg",
              ["com1","com2"],
            ["gunre1","gunre2"]),new User ("name2",
                 "title",
                 "email",
                 "pass",
                 "type",
                 [701,702],
                 [1,2,3,4],
                 "googleId",
                 ["follow1","follow2","follow3","foolow4","follow5"],
                 "../../assets/image/b371-b3f4-4b13-a949-e7c568491a5f.jpg",
                 ["com1","com2"],
               ["gunre1","gunre2"])],
         "Title",
         "urlSrc",
         [new User ("name",
              "title",
              "email",
              "pass",
              "type",
              [701,702],
              [1,2,3,4],
              "googleId",
              ["follow1","follow2","follow3","foolow4","follow5"],
              "../../assets/image/b371-b3f4-4b13-a949-e7c568491a5f.jpg",
              ["com1","com2"],
            ["gunre1","gunre2"]),new User ("name",
                 "title",
                 "email",
                 "pass",
                 "type",
                 [701,702],
                 [1,2,3,4],
                 "googleId",
                 ["follow1","follow2","follow3","foolow4","follow5"],
                 "../../assets/image/profile-img.jpg",
                 ["com1","com2"],
               ["gunre1","gunre2"])],
         "genre",
         "../../assets/image/AlbumCover.png",
         [new CommentData("123","name1 family1",
         "../../assets/image/AlbumCover.png","hello world",new Date(Date.now()-20*60*60*1000)),
         new CommentData("123","name2 family2",
         "../../assets/image/AlbumCover.png","this is a comment",new Date(Date.now() - 34*60*1000)),
         new CommentData("123","name2 family2",
         "../../assets/image/AlbumCover.png","this is a comment",new Date(Date.now()-30*24*60*60*1000))],
         [new Song(222,["author1","author2"],"title",
       "../../assets/image/AlbumCover.png","../../assets/image/AlbumCover.png",
     "4","Alternative")]);
*/
/*
getAlbum(limit:number, genre:string):Promise <Album[]>{
  return this.http.post('https://hiptop.herokuapp.com/getAllAlbumsConclusion',{limit:limit,genre:genre})
        .toPromise()
        .then(response => response.json() as Album[])
  .catch(err => err.json() as Album[]);
}
*/
        constructor(private http:Http){}

         getAlbumById(id:string):Promise <AlbumWall>{
           return this.http.post('https://hiptop.herokuapp.com/getAllAlbumByIdHybrid',{albumId:'701'})
                 .toPromise()
                 .then(response => response.json() as AlbumWall)
           .catch(err => err.json() as AlbumWall);
           //this.albumWall.comment[0].date=new Date(Date.now()-aDay)
          // console.log('in server' + id);
           //return this.albumWall;
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
