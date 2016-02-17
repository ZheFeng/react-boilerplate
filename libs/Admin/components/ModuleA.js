import React, { Component } from 'react';

class ModuleA extends Component {
  static displayName = 'ModuleA';
  render() {
    require.ensure([], () => {
      const moduleA = require('../../ModuleA').default;
      moduleA();
    });
    return (
      <div>ModuleA</div>
    );
  }
}


export default ModuleA;
