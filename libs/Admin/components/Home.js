import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import mixin from './mixin';

@reactMixin.decorate(mixin)
class Home extends Component {
  static displayName = 'Home';
  render() {
    return (
      <div>Home</div>
    );
  }
}

export default Home;
