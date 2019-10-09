import React, { Component } from 'react';
import Types from 'prop-types';

export default class Person extends Component {
  render() {
    const {
      firstName,
      age,
    } = this.props;

    return
  }
}

Person.propTypes = {
  firstName: Types.string,
  age: Types.number,
}
