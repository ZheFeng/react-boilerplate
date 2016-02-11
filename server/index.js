import express from 'express';
import path from 'path';
import http from 'http';
import winston from 'winston';
import favicon from 'serve-favicon';
import { config, name } from '../package';


const app = express();
const router = express.Router();
const assetsPath = path.join(...[__dirname, '..'].concat(config.path.assets));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(assetsPath, 'images', 'nodejs.png')));
app.use(express.static(assetsPath));

router.get('/', (req, res) => {
  const scripts = [
    'base',
    'admin_lib',
    'share',
    'admin',
  ];
  res.render('index', { title: name, scripts });
});
app.use(router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


export function startServer(PORT, onError, onListening) {
  app.set('port', PORT);
  const server = http.createServer(app);

  winston.info(`[${process.env.NODE_ENV}] Starting server...`);
  server.listen(PORT);
  server.on('error', onError);
  if (process.env.NODE_ENV === 'development') {
    const startDevServer = require('./webpackDevServer').startServer;
    server.on('listening', () => {
      startDevServer(PORT, 8080, onListening);
    });
  } else {
    server.on('listening', onListening);
  }
}
