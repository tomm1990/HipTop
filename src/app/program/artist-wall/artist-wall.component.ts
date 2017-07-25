import { Component, OnInit } from '@angular/core';
import {GetArtistService} from "../../app.GetUserService";
import {User} from "../../app-shared/model/user.model";
import { ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-artist-wall',
  templateUrl: 'artist-wall.component.html',
  styleUrls: ['artist-wall.component.css']
})
export class ArtistWallComponent implements OnInit {
  id:string;
  user:User;
  constructor(private AlService:GetArtistService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        console.log('id param' + this.id);
      }
    );

    this.AlService.getArtist(this.id).then((user: User)=>{
      this.user = user;
        console.log("length " + this.user);
    });


  //  console.log(this.user.imgSrc);
  }
  onFollow(){
    this.AlService.follow('5975f543e33a59d85e114021',this.user._id).then((str: string)=>{
    });
  }


}
