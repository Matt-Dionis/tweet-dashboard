import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { Tweet } from '../shared/tweet';
import { TwitterState } from '../shared/twitterState';

@Component({
  selector: 'tweet-component',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(600)
      ]),
      transition('* => void', [
        animate(600, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
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
