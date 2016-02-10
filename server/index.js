import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import { config } from '../package';
import htmlRender from './htmlRender';


const app = express();
const router = express.Router();
const assetsPath = path.join(...[__dirname, '..'].concat(config.path.assets));

app.use(favicon(path.join(assetsPath, 'images', 'nodejs.png')));
app.use(express.static(assetsPath));

router.get('/', (req, res) => {
  res.send(htmlRender());
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


export default app;
