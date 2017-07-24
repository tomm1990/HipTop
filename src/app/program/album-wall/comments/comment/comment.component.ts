import { Component, OnInit,Input } from '@angular/core';
import {AlbumWall} from "../../../../app-shared/model/albumWall.model";
import {CommentData} from "../../../../app-shared/model/commentData.model";
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input() comment : CommentData;
  constructor() { }

  ngOnInit() {
    //console.log(`this.comment.user -> ${this.comment.user}`);
    //console.log(`this.comment.user.name -> ${this.comment.user.name}`);
    //console.log(`this.comment.user.imgSrc -> ${this.comment.user.imgSrc}`);


  }
  timeSince(date) {

    var seconds = Math.floor((new Date().getTime() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
 getTime(date) {
    var h = this.addZero(date.getHours());
    var m = this.addZero(date.getMinutes());
    var s = this.addZero(date.getSeconds());
    return h + ':' + m;

}
}
