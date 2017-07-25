export class Song {
  public id: number;
  public author:string[];
  public title:string;
  public urlSrc:string;
  public imgSrc:string;
  public length:string;
  public genre:string;


  constructor(id: number, author: string[], title: string,imgSrc:string ,urlSrc: string, length:string,genre:string) {
    this.id = id;
    this.genre = genre;
    this.author = author;
    this.title = title;
    this.urlSrc = urlSrc;
    this.imgSrc = imgSrc;
    this.length = length;
  }
}
