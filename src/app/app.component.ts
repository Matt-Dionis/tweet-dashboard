import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import * as D3 from 'd3/index';
import './rxjs-operators';

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
          this.streamContainer.append('p').html(tweet);
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
