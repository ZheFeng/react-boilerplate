import React, { PropTypes, Component } from 'react';
import { Map } from 'immutable';
import moduleA from '../moduleA';

class Admin extends Component {
  static displayName = 'Admin';
  static propTypes = {
    name: PropTypes.string,
  };
  render() {
    moduleA();
    const data = new Map({ name: 'Admin' });
    return (
      <div>{data.get('name')}</div>
    );
  }
}


export default Admin;
