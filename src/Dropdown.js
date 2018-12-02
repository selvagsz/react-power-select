import React, { Component } from 'react';
import TetherComponent from 'react-tether';
import cx from 'classnames';

export default class Dropdown extends Component {
  render() {
    let { className, children } = this.props;
    return (
      <TetherComponent
        className={cx('PowerSelect__Tether', className && `${className}__Tether`)}
        attachment="top left"
        targetAttachment="bottom left"
        constraints={[
          {
            to: 'window',
            attachment: 'together',
          },
        ]}
      >
        {children}
      </TetherComponent>
    );
  }
}
