import express from 'express';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from '../libs/Admin/routes/index.server';
import getChunckPath from './getChunckPath';
import { name } from '../package';


const router = express.Router();
const scripts = [
  'base',
  // 'admin_lib',
  // 'share',
  'admin',
].map(getChunckPath);

function render(res, err, redirect, props) {
  const appHtml = renderToString(<RouterContext {...props} />);
  res.render('index', { title: name, scripts, appHtml });
}

router.get('*', (req, res) => {
  match({ routes, location: req.url }, render.bind(null, res));
});


export default router;
