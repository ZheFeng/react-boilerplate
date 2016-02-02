import React, { Component } from 'react';
import { Map } from 'immutable';
import moduleA from '../moduleA';

class Admin extends Component {
  static displayName = 'Admin';
  render() {
    moduleA();
    const data = new Map({ name: 'Admin' });
    return (
      <div>{data.get('name')}</div>
    );
  }
}


export default Admin;
