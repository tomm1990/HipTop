import {Component, OnInit, Input} from '@angular/core';
import {Album} from "../../../../app-shared/model/album.model";

@Component({
  selector: 'app-popular-item',
  templateUrl: 'popular-item.component.html',
  styleUrls: ['popular-item.component.css']
})
export class PopularItemComponent implements OnInit {
  @Input() album : Album;
  constructor() { }

  ngOnInit() {
  }

  func(){
      console.log('test');
  }
}
