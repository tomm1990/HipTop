import { User } from './user.model';
export class CommentData {
  public id: string;
  public user: User;
  //public imgSrc:string;
  public message:string;
  public date:Date;

  //constructor(id: string, user: User, message: string, date: Date) {
  constructor(id: string, name: string, img:string, message: string, date: Date) {

    this.id = id;
    this.user = new User(
    name,
    'title',
    'email',
    'pass',
    'type',
    [1],
    [1],
    'googId',
    ['1'],
    '../../../assets/image/profile-img.jpg',
    ['genre']
              );
    //this.user = user;
    //this.imgSrc = imgSrc;
    this.message = message;
    this.date = date;
  }
}
