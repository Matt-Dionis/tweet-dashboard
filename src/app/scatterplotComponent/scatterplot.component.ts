import { Component, Input } from '@angular/core';

import { Tweet } from '../shared/tweet';

@Component({
  selector: 'scatterplot-component',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent {
  @Input()
  tweets: Tweet[];
}
