export class Song {
  public _id:string;
  public id: number;
  public author:string[];
  public title:string;
  public urlSrc:string;
  public imgSrc:string;
  public length:string;
  public genre:string;

  constructor(_id:string,id: number, author: string[], title: string,imgSrc:string ,urlSrc: string, length:string,genre:string) {
    this._id = _id;
    this.id = id;
    this.genre = genre;
    this.author = author;
    this.title = title;
    this.urlSrc = urlSrc;
    this.imgSrc = imgSrc;
    this.length = length;
  }
}
