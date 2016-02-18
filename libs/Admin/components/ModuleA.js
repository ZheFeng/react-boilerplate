import React, { Component } from 'react';

class ModuleA extends Component {
  static displayName = 'ModuleA';
  state = {
    text: 'loading...',
  };
  componentDidMount() {
    require.ensure([], (require) => {
      const $ = require('jquery');
      const moduleA = require('../../ModuleA').default;
      moduleA();
      const title = $('title').text();
      this.setState({
        text: title,
      });
    });
  }
  render() {
    return (
      <div>{this.state.text}</div>
    );
  }
}


export default ModuleA;
