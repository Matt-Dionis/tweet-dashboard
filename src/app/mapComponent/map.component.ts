import { Component, OnInit } from '@angular/core';
import '../rxjs-operators';

import { MapService } from '../shared/map.service';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  errorMessage: string;

  constructor (private _mapService: MapService) { }

  ngOnInit() {
    this.getMapData();
  }

  getMapData() {
    this._mapService.getMapData()
      .subscribe(
        mapData => console.log(mapData),
        error =>  this.errorMessage = <any>error
      )
  }
}
