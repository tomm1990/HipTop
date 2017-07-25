import { Component, OnInit,Input } from '@angular/core';
import { Album } from "../../app-shared/model/album.model";

@Component({
  selector: 'app-footer-player',
  templateUrl: 'footer-player.component.html',
  styleUrls: ['footer-player.component.css']
})

export class FooterPlayerComponent implements OnInit {
@Input()  albumToPlay:Album;
  constructor() { }

  ngOnInit() {
  }

}
