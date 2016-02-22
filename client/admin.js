import React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory } from 'react-router';
import { routes } from '../libs/Admin';

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
  render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('app')
  );
});
