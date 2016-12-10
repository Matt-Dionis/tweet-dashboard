import { Component, ElementRef, Input } from '@angular/core';
import * as D3 from 'd3/index';

import { Tweet } from '../shared/tweet';
import { TwitterState } from '../shared/twitterState';

@Component({
  selector: 'scatterplot-component',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent {
  @Input()
  twitterState: TwitterState;
  height;
  host;
  htmlElement: HTMLElement;
  margin;
  svg;
  width;
  xAxis;
  xScale;
  yAxis;
  yScale;
  zScale;

  constructor(private _element: ElementRef) {
    this.host = D3.select(this._element.nativeElement);
  }

  ngOnChanges() {
    this.setup();
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('#scatterplot').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.bottom - this.margin.top;
    this.xScale = D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.zScale = D3.scaleLinear().range([2, 15]);
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  drawXAxis() {
    this.xAxis = D3.axisBottom(this.xScale)
      .ticks(5)
      .tickPadding(15);
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis)
      .append('text')
        .attr('class', 'label')
        .attr('x', this.width)
        .attr('y', -6)
        .style('text-anchor', 'end')
        .style('fill', 'grey')
        .text('Followers');
  }

  drawYAxis() {
    this.yAxis = D3.axisLeft(this.yScale)
      .ticks(5)
      .tickPadding(10);
    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .style('fill', 'grey')
        .text('Following');
  }

  getMax(metric) {
    let metricArray = [];
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach((tweet) => {
        metricArray.push(tweet[metric]);
      });
      return D3.max(metricArray);
    }
  }

  populate() {
    if (this.twitterState.tweets) {
      this.xScale.domain([0, this.getMax('followers_count')]);
      this.yScale.domain([0, this.getMax('following_count')]);
      this.zScale.domain([0, this.getMax('statuses_count')]);
      this.svg.selectAll('.dot')
        .data(this.twitterState.tweets)
        .enter().append('circle')
          .attr('class', 'dot')
          .attr('r', (d) => this.zScale(d.statuses_count))
          .attr('cx', (d) => this.xScale(d.followers_count))
          .attr('cy', (d) => this.yScale(d.following_count))
          .style('fill', 'blue')
          .style('opacity', 0.4)
          .style('cursor', 'pointer')
          .on('click', function(d) {
            window.open('http://twitter.com/@' + d.username);
          })
          .append('title')
            .text(d => 'Followers: ' + d.followers_count + ', ' +
              'Following: ' + d.following_count + ', ' + 'Tweets: ' + d.statuses_count);
    }
  }
}
