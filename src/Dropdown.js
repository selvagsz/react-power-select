import React, { Component } from 'react';
import TetherComponent from 'react-tether';

export default class Dropdown extends Component {
  render() {
    let { children, ...rest } = this.props;
    return (
      <TetherComponent
        attachment="top left"
        targetAttachment="bottom left"
        {...rest}
      >
        {children}
      </TetherComponent>
    );
  }
}
