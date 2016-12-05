import { Component, Input } from '@angular/core';

import { Tweet } from '../shared/tweet';
import { TwitterState } from '../shared/twitterState';

@Component({
  selector: 'tweet-component',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  @Input()
  twitterState: TwitterState;
  latestTweets: Tweet[];

  ngOnChanges() {
    if (this.twitterState.tweets) {
      this.twitterState.tweets.sort(function(a, b) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      this.latestTweets = this.twitterState.tweets.slice(0, 10);
    }
  }
}
