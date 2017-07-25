import { Component, OnInit,Input,Output,ElementRef,ViewChild,EventEmitter } from '@angular/core';
import {AlbumWall} from "../../../app-shared/model/albumWall.model";
import {CommentData} from "../../../app-shared/model/commentData.model";
import {User} from "../../../app-shared/model/user.model";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
@ViewChild('newCommentInput') newCommentInputRef  : ElementRef;
@Input() albumWall : AlbumWall;
@Output() commentAdded = new EventEmitter<CommentData>();
  newUser : User;
  newComment : CommentData;

  constructor() { }

  ngOnInit() {
    //console.log(`albumWall.comment.length -> ${this.albumWall.comment.length}`);
    for(let i=0 ; i < this.albumWall.comment.length ; i++){
      //console.log(`this.albumWall.comment[${i}].user.name -> ${this.albumWall.comment[i].user.name}`);
    }
  }

  onAddComment(){
    this.newUser = new User(
    'Temp Name',
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

    //constructor(id: string, user: User, message: string, date: Date) {
    //console.log(`this.newUser -> ${this.newUser.name}`);
    //console.log(`this.newUser -> ${this.newUser[0].name}`);



    this.newComment = new CommentData('5947de523441f88b1fa43fbc',
      // this.newUser,
      this.newUser.name,
      this.newUser.imgSrc,
      this.newCommentInputRef.nativeElement.value,
      new Date());
    this.commentAdded.emit(this.newComment);

  }
}
