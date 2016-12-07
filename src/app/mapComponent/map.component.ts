import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';
import '../rxjs-operators';

import { MapService } from '../shared/map.service';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  errorMessage: string;
  height;
  host;
  htmlElement: HTMLElement;
  mapData;
  margin;
  projection;
  path;
  svg;
  width;

  constructor (private _element: ElementRef, private _mapService: MapService) {
    this.host = D3.select(this._element.nativeElement);
  }

  ngOnInit() {
    this.getMapData();
    this.setup();
    this.buildSVG();
  }

  getMapData() {
    this._mapService.getMapData()
      .subscribe(
        mapData => this.setMap(mapData),
        error =>  this.errorMessage = <any>error
      )
  }

  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('#map').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.bottom - this.margin.top;
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  setMap(mapData) {
    this.mapData = mapData;
    this.projection = D3.geoAlbersUsa()
      .translate([this.width /2 , this.height /2 ])
      .scale(700);
    this.path = D3.geoPath()
      .projection(this.projection);

    this.svg.selectAll('path')
      .data(this.mapData.features)
      .enter().append('path')
        .attr('d', this.path)
        .style('stroke', '#fff')
        .style('stroke-width', '1')
        .style('fill', 'lightgrey');
  }
}
