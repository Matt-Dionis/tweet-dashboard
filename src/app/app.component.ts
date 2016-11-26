import { Component, OnInit } from '@angular/core';

import { TweetService } from './shared/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string;
  title = 'app works!';

  constructor (private _tweetService: TweetService) { }

  ngOnInit() {
    this.connectToTweetStream();
  }

  connectToTweetStream() {
    this._tweetService.connectToStream()
      .subscribe(
        tweet => {
          console.log(tweet);
        },
        error =>  this.errorMessage = <any>error
      );
  }
}
