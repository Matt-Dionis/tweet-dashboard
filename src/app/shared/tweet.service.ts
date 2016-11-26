import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class TweetService {
  private url = 'http://localhost:3000';
  private socket;

  constructor (private _http: Http) { }

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

  setSearchTerm(searchTerm: string): Observable<any> {
    return this._http.get(`${this.url}/stream/${searchTerm}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
