import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';
import './rxjs-operators';

import { TweetService } from './shared/tweet.service';

@Component({
  selector: 'app-root',
  template: '<ng-content></ng-content>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string;
  host;
  svg;
  tweetCount: number = 0;

  constructor (private element: ElementRef, private _tweetService: TweetService) {
    this.host = D3.select(this.element.nativeElement);
  }

  ngOnInit() {
    this.setSearchTerm('javascript');
    this.connectToTweetStream();
    this.buildSVG();
  }

  buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', '1200')
      .attr('height', '800')
      .append('g')
      .attr('transform', 'translate(40, 40)');
  }

  connectToTweetStream() {
    this._tweetService.connectToStream()
      .subscribe(
        tweet => {
          this.svg.append('text')
            .text(tweet)
            .attr('y', this.tweetCount * 20);
          this.tweetCount++;
        },
        error =>  this.errorMessage = <any>error
      );
  }

  setSearchTerm(searchTerm) {
    this._tweetService.setSearchTerm(searchTerm)
      .subscribe(
        () => console.log('search term set'),
        error =>  this.errorMessage = <any>error
      )
  }
}
