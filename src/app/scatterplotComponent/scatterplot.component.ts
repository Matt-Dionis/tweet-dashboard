import { Component, ElementRef, Input } from '@angular/core';
import * as D3 from 'd3/index';

import { Tweet } from '../shared/tweet';

@Component({
  selector: 'scatterplot-component',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent {
  @Input()
  twitterState: any;
  chart;
  host;

  constructor (private _element: ElementRef) {
    this.host = D3.select(this._element.nativeElement);
  }

  ngOnChanges() {
    this.buildSVG();
  }

  buildSVG(): void {
    console.log('change detected');
    this.chart = this.host.append('h1')
      .html('Testing...');
  }
}
