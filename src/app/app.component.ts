import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';
import './rxjs-operators';

import { Tweet } from './shared/tweet';
import { TweetService } from './shared/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string;
  host;
  streamContainer;
  term: string;
  tweets: Tweet[] = [];

  constructor (private _element: ElementRef, private _tweetService: TweetService) {
    this.host = D3.select(this._element.nativeElement);
  }

  ngOnInit() {
    this.buildSVG();
    this.connectToTweetStream();
  }

  buildSVG(): void {
    this.streamContainer = this.host.append('div');
  }

  connectToTweetStream() {
    this._tweetService.connectToStream()
      .subscribe(
        tweet => {
          this.tweets.push(tweet as Tweet);
        },
        error => this.errorMessage = <any>error
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
