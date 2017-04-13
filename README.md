# TweetDashboard
This project (other than the Express server) was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0.

## Twitter API
Visit the [Twitter dev page](https://apps.twitter.com/) and create a basic application to gain access to necessary API credentials.
Set CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET in `server.js`.

## Development server
Run `npm install` to install all dependencies (d3, express, socket.io, and twitter libs have been added to this otherwise stock Angular CLI project).
Run `npm run serve-build` for a dev server. Navigate to `http://localhost:3000/`.

Note: This project was recently updated to Angular v2.3.1, Angular-CLI v1.0.0, and TypeScript v2.0.10. For a clean build run:
```
npm uninstall -g angular-cli
npm uninstall --save-dev angular-cli
npm install -g @angular/cli@latest
rm -rf node_modules dist
npm install
```

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Further help
To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
To reach out to me personally, contact me on Twitter [@mattdionis](https://twitter.com/MattDionis)
