import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Admin extends Component {
  static displayName = 'Admin';
  static propTypes = {
    children: PropTypes.node,
  };
  render() {
    return (
      <div>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jquery">jquery</Link></li>
            <li><Link to="/moment">moment</Link></li>
            <li><Link to="/moduleA">moduleA</Link></li>
          </ul>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}


export default Admin;
