export class User {
  public name: string;
  public title:string;
  public email:string;
  public password:string;
  public typeEnum:string;
  public albumId:number[];
  public likeAlbum:number[];
  public follow:string[];
  public imgSrc:string;
  public comment:string[];
  public googleId:string;
  public preferedGenre:string[];


  constructor( name: string, title: string, email: string, password: string, typeEnum:string ,albumId:number[],likeAlbum:number[] ,googleId:string, follow: string[], imgSrc: string, comment: string[], preferedGenre: string[]) {
console.log("constractor " + email);
    this.name = name;
    this.title = title;
    this.email = email;
    this.likeAlbum = likeAlbum;
    this.password = password;
    this.typeEnum = typeEnum;
    this.albumId = albumId;
    this.imgSrc = imgSrc;
    this.comment = comment;
    this.follow = follow;
    this.preferedGenre = preferedGenre;
  }
}
