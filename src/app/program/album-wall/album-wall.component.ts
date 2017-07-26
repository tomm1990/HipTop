import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import {GetAlbumService} from "../../app.GetAlbumService";
import {AlbumService} from "../../app.AlbumService";
import {AlbumWall} from "../../app-shared/model/albumWall.model";
import {CommentData} from "../../app-shared/model/commentData.model";
import {Album} from "../../app-shared/model/album.model";
import {User} from "../../app-shared/model/user.model";
import {FooterPlayerComponent} from "../footer-player/footer-player.component";
import {AlbumToPlayComponent} from "../../app-shared/album-to-play/album-to-play.component";

@Component({
  selector: 'app-album-wall',
  templateUrl: './album-wall.component.html',
  styleUrls: ['./album-wall.component.css']
})
export class AlbumWallComponent implements OnInit {
  album:Album[];
  albumWall:AlbumWall;
  constructor(private route:ActivatedRoute,
              private AlService:GetAlbumService,
              private AlbuService:AlbumService,
              public albumToPlay : AlbumToPlayComponent,
              public footerPlayer : FooterPlayerComponent) {
    this.albumToPlay = albumToPlay;
    this.footerPlayer = footerPlayer;
  }

  id:string;

  ngOnInit() {

    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
      }
    );
    this.AlbuService.getAlbumById(this.id).then((albumWall1: AlbumWall)=>{
      this.albumWall = albumWall1[0];

      for(let i=0 ;i<this.albumWall.comment.length;i++){
        this.albumWall.comment[i].date = new Date(this.albumWall.comment[i].date);
      }

    });

  }

  onCommentAdd(comment:CommentData){
    document.getElementsByTagName('input')[0].value='';

    this.AlbuService.insertCommentToDB('5975f543e33a59d85e114021',comment.message,this.id).then((res: string)=>{
      comment.user.imgSrc = "http://shenkar.html5-book.co.il/2016-2017/rs/dev_184/assets/image/profile-img.jpg";
      this.albumWall.comment.push(comment);
    });
  }
  onAddLike(){
    const user = new User ("name",
      "title",
      "email",
      "pass",
      "type",
      [701,702],
      [1,2,3,4],
      "googleId",
      ["follow1","follow2","follow3","foolow4","follow5"],
      "http://shenkar.html5-book.co.il/2016-2017/rs/dev_184/assets/image/profile-img.jpg",

      ["gunre1","gunre2"]);
    this.albumWall.likes.push(user);
    this.AlbuService.insertLikeToDB('1',this.id);

  }

  onPlayAlbum(albumWall : AlbumWall){
    this.albumToPlay.change(albumWall);

    this.footerPlayer.onClick();

  }

}
