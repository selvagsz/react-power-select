import React, { Component } from 'react';
import TetherComponent from 'react-tether';
import cx from 'classnames';

export default class Dropdown extends Component {
  render() {
    let { className, horizontalPosition, children } = this.props;
    return (
      <TetherComponent
        className={cx('PowerSelect__Tether', className && `${className}__Tether`)}
        attachment={`top ${horizontalPosition}`}
        targetAttachment={`bottom ${horizontalPosition}`}
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
