import React, { Component } from 'react';
import moduleA from '../../moduleA';

class ModuleA extends Component {
  static displayName = 'ModuleA';
  render() {
    moduleA();
    return (
      <div>ModuleA</div>
    );
  }
}


export default ModuleA;
