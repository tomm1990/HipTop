import { Component, OnInit,Input } from '@angular/core';
import { User } from "../../app-shared/model/User.model";
@Component({
  selector: 'app-music-set',
  templateUrl: 'music-set.component.html',
  styleUrls: ['music-set.component.css']
})
export class MusicSetComponent implements OnInit {
@Input() user : User;
  constructor() { }

  ngOnInit() {
  }

}
