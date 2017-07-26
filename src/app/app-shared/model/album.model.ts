export class Album {
  public id: string;
  public author: string[];
  public title:string;
  public urlSrc:string;
  public likes:string[];
  public genre:string;
  public imgUrl:string;
  public comment:string[];
  public songId:string[];



  // constructor(name: string, desciption: string, image: string) {
  //   this.name    = name;
  //   this.desc    = desciption;
  //   this.imgPath = image;
  // }

  constructor(public _id:string,id: string, author: string[], title: string, urlSrc: string, likes: string[], genre: string, imgUrl: string, comment: string[], songId: string[]) {
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
