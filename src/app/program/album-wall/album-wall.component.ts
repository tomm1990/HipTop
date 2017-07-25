import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import {GetAlbumService} from "../../app.GetAlbumService";
import {AlbumService} from "../../app.AlbumService";
import {AlbumWall} from "../../app-shared/model/albumWall.model";
import {CommentData} from "../../app-shared/model/commentData.model";
import {Album} from "../../app-shared/model/album.model";
import {User} from "../../app-shared/model/user.model";

@Component({
  selector: 'app-album-wall',
  templateUrl: './album-wall.component.html',
  styleUrls: ['./album-wall.component.css']
})
export class AlbumWallComponent implements OnInit {
album:Album[];
albumWall:AlbumWall;
  constructor(private route:ActivatedRoute,private AlService:GetAlbumService,
              private AlbuService:AlbumService) { }

  id:string;

  ngOnInit() {

    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
    //    console.log('id param' + this.id);
      }
    );
    this.AlbuService.getAlbumById(this.id).then((albumWall1: AlbumWall)=>{
      this.albumWall = albumWall1[0];
    //  console.log(`albumWall.comment.length -> ${this.albumWall.comment.length}`);
    //  console.log(`albumWall.comment[0].user.title -> ${this.albumWall.comment[0].user.title}`);
    //  console.log(`albumWall.comment[1].user.title -> ${this.albumWall.comment[1].user.title}`);

      for(let i=0 ;i<this.albumWall.comment.length;i++){
        //this.albumWall.comment[i] = new CommentData();

        this.albumWall.comment[i].date = new Date(this.albumWall.comment[i].date);
      }

      //console.log(`this.albumWall -> ${(this.albumWall[0].likes.length)}`);
      //  console.log("length " + this.albumWall.id);
    });
    //this.albumWall = this.AlService.getAlbum(this.id);
    //console.log(this.albumWall.author);


  }

  onCommentAdd(comment:CommentData){
    console.log('new comment');
    document.getElementsByTagName('input')[0].value='';
    //this.AlbuService.insertCommentToDB(comment.id,comment.message,this.id);

    this.AlbuService.insertCommentToDB('5975f543e33a59d85e114021',comment.message,this.id).then((res: string)=>{
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
         "../../assets/image/profile-img.jpg",

       ["gunre1","gunre2"]);
       this.albumWall.likes.push(user);
       this.AlbuService.insertLikeToDB('1',this.id);

  }



}
