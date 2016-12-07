var express = require('express');
var http = require('http');
var path = require('path');
var twit = require('twitter');

var app = express();
var mapData = require('./us-states.json');
var port = process.env.PORT || 3000;
var router = express.Router();
var staticRoot = __dirname;
var twitter = new twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
});

app.set('port', (port));
app.use(express.static(staticRoot));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

var server = http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});

var io = require('socket.io').listen(server);

app.get('/stream/:searchTerm', function(req, res, next) {
  var searchTerm = req.params.searchTerm

  twitter.stream('statuses/filter', {track: searchTerm}, function(stream) {
    stream.on('data', function(data) {
      data.location = data.geo ? data.geo.coordinates : [];
      var tweet = {
        created_at: data.created_at,
        text: data.text,
        username: data.user.screen_name,
        followers_count: data.user.followers_count,
        following_count: data.user.friends_count,
        statuses_count: data.user.statuses_count,
        profile_image_url: data.user.profile_image_url,
        coordinates: data.location
      };
      io.emit('tweet', tweet);
    });

    stream.on('error', function(error) {
      throw error;
    });
  });
});

app.get('/mapData', function(req, res) {
  res.status(200).json({data: mapData});
});
