import React, { Component } from 'react';
import moduleA from '../moduleA';

class Consumer extends Component {
  static displayName = 'Consumer';
  render() {
    moduleA();
    return (
      <div>Consumer</div>
    );
  }
}


export default Consumer;
