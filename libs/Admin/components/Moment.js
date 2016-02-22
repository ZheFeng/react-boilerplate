import React, { Component } from 'react';
import moment from 'moment';

class Moment extends Component {
  static displayName = 'Moment';

  state = {
    time: moment().format('MMMM Do YYYY, h:mm:ss a'),
  };
  componentDidMount() {
    this.interval = setInterval(this.setTime.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setTime() {
    this.setState({
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
  }
  render() {
    return (
      <div>
        <div>{this.state.time}</div>
        <div>{this.calculator(134, 5672)}</div>
      </div>
    );
  }
  calculator(a, b) {
    return a + b;
  }
}


export default Moment;
