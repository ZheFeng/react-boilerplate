import express from 'express';
import path from 'path';
import http from 'http';
import winston from 'winston';
import favicon from 'serve-favicon';
import moment from 'moment';
import { config, name } from '../package';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../libs/Admin/routes';


const app = express();
const router = express.Router();
const assetsPath = path.join(...[__dirname, '..'].concat(config.path.assets));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


if (app.get('env') === 'development') {
  app.use((req, res, next) => {
    winston.info(`[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

app.use(favicon(path.join(assetsPath, 'images', 'nodejs.png')));
app.use(express.static(assetsPath));

router.get('*', (req, res) => {
  const scripts = [
    // 'base',
    // 'admin_lib',
    // 'share',
    'admin',
  ];
  match({ routes, location: req.url }, (err, redirect, props) => {
    const appHtml = renderToString(<RouterContext {...props}/>);
    res.render('index', { title: name, scripts, appHtml });
  });
});
app.use(router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  winston.error('Not Found: ', req.url);
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
  const isDevelopment = process.env.NODE_ENV === 'development';
  const SERVER_PORT = isDevelopment ? 8080 : PORT;
  const DEV_SERVER_PORT = PORT;


  app.set('port', SERVER_PORT);
  const server = http.createServer(app);

  winston.info(`[${process.env.NODE_ENV}] Starting server...`);
  server.listen(SERVER_PORT);
  server.on('error', onError);
  if (isDevelopment) {
    const startDevServer = require('./webpackDevServer').startServer;
    server.on('listening', () => {
      startDevServer(SERVER_PORT, DEV_SERVER_PORT, onListening);
    });
  } else {
    server.on('listening', () => onListening(SERVER_PORT));
  }
}
