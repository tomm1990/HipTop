import { Component,OnInit } from '@angular/core';
import {AlbumService} from "./app.AlbumService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedFeature = 'intro';
  //Output() userInstance : User;


constructor(private AlService:AlbumService){}
ngOnInit(){
  //this.loadedFeature = this. AlService.changeAppState();
}


onChangeMode(mode:string){
  console.log('on father');
//  this.loadedFeature = this. AlService.changeAppState();
  this.loadedFeature=mode;
}
  title = 'app works!';
}
