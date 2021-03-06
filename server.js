/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');

// connect to db
const dbConnectHandler = require('./backend/db/dbConnect');

const isDeveloping = process.env.NODE_ENV !== 'production';

const PORT = isDeveloping ? 4444 : process.env.PORT;
const IP = process.env.IP || '127.0.0.1';

console.log(process.env.PORT);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const routes = require('./backend/routes/routes')(app);

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

const server = app.listen(PORT, IP, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://%s:%s/ in your browser.', PORT, IP, PORT);
});

module.exports = server;
