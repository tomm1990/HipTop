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
    'http://shenkar.html5-book.co.il/2016-2017/rs/dev_184/assets/image/profile-img.jpg',
    ['genre']
              );





    this.newComment = new CommentData('5947de523441f88b1fa43fbc',
      // this.newUser,
      this.newUser.name,
      this.newUser.imgSrc,
      this.newCommentInputRef.nativeElement.value,
      new Date());
    this.commentAdded.emit(this.newComment);

  }
}
