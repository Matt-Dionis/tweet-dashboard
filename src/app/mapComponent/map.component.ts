import { Component, ElementRef, Input } from '@angular/core';
import * as D3 from 'd3/index';
import '../rxjs-operators';

import { MapService } from '../shared/map.service';
import { Tweet } from '../shared/tweet';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input()
  twitterState: any;
  errorMessage: string;
  height;
  host;
  htmlElement: HTMLElement;
  mapData;
  margin;
  points: number[][] = [];
  projection;
  path;
  svg;
  width;

  constructor (private _element: ElementRef, private _mapService: MapService) {
    this.host = D3.select(this._element.nativeElement);
    this.getMapData();
    this.setup();
    this.buildSVG();
  }

  ngOnChanges() {
    if (this.twitterState.tweets) {
      this.updateDots(this.twitterState.tweets);
    }
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
      .scale(650);
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

  updateDots(tweets) {
    this.points = [];
    tweets.forEach((tweet) => {
      if (tweet.coordinates.length > 0) {
        const lon = tweet.coordinates[1];
        const lat = tweet.coordinates[0];
        const coords = [lon, lat];
        if (this.projection(coords)) {
          this.points.push(this.projection(coords));
        }
      }
    });
    this.svg.selectAll('circle')
      .data(this.points).enter()
      .append('circle')
        .attr('cx', function(d) {
          return d[0];
        })
        .attr('cy', function(d) {
          return d[1];
        })
        .attr('r', '4px')
        .style('fill', 'blue')
        .style('opacity', 0.4);
  }
}
