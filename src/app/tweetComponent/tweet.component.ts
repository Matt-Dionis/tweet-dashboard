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
}
