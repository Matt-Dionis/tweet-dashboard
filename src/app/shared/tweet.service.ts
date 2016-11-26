import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class TweetService {
  private url = 'http://localhost:3000';
  private socket;

  connectToStream() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('tweet', (tweet) => {
        observer.next(tweet);
      });
      return () => {
        this.socket.disconnect();
      }; 
    })
    return observable;
  }
}
