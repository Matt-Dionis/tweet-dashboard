import { Component, OnInit } from '@angular/core';
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
  term: string;
  tweets: Tweet[] = [];
  twitterState: any = {};

  constructor (private _tweetService: TweetService) { }

  ngOnInit() {
    this.connectToTweetStream();
  }

  connectToTweetStream() {
    this._tweetService.connectToStream()
      .subscribe(
        tweet => {
          this.tweets.push(tweet as Tweet);
          this.twitterState = {
            tweets: this.tweets
          };
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
