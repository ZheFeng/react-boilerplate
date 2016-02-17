import React, { Component } from 'react';

class ModuleA extends Component {
  static displayName = 'ModuleA';
  render() {
    require.ensure(['../../ModuleA'], () => {
      const moduleA = require('../../ModuleA');
      moduleA();
    });
    return (
      <div>ModuleA</div>
    );
  }
}


export default ModuleA;
