import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ScatterplotComponent } from './scatterplotComponent/scatterplot.component';
import { TweetComponent } from './tweetComponent/tweet.component';
import { TweetService } from './shared/tweet.service';

@NgModule({
  declarations: [
    AppComponent,
    ScatterplotComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
