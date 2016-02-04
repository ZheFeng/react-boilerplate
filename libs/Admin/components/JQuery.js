import React, { Component } from 'react';
import $ from 'jquery';

class JQuery extends Component {
  static displayName = 'JQuery';
  render() {
    const title = $('title').text();
    return (
      <div>{title}</div>
    );
  }
}


export default JQuery;
