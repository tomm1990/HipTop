import { CommentData } from './commentData.model';
import { Song } from './song.model';
import { User } from './user.model';

export class AlbumWall {
  public id: string;
  public title:string;
  public author: User[];
  public urlSrc:string;
  public likes:User[];
  public genre:string;
  public imgUrl:string;
  public comment:CommentData[];
  public songId:Song[];

  constructor(public _id:string,id: string, author: User[], title: string, urlSrc: string, likes: User[], genre: string, imgUrl: string, comment: CommentData[], songId: Song[]) {
    console.log("constractor " + author);
    this._id = _id;
    this.id = id;
    this.author = author;
    this.title = title;
    this.urlSrc = urlSrc;
    this.likes = likes;
    this.genre = genre;
    this.imgUrl = imgUrl;
    this.comment = comment;
    this.songId = songId;
  }
}
