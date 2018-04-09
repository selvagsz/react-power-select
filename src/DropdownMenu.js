import React, { Component } from 'react';
import cx from 'classnames';
import { renderComponent } from './utils';

export default class DropdownMenu extends Component {
  componentWillMount() {
    this.validateAndClose(this.props.options);
  }

  componentWillReceiveProps({ options }) {
    this.validateAndClose(options);
  }

  validateAndClose(options) {
    let { beforeOptionsComponent, afterOptionsComponent, select } = this.props;
    if (!beforeOptionsComponent && !afterOptionsComponent && !options.length) {
      select.actions.close();
    }
  }

  render() {
    let {
      children,
      className,
      select,
      handleKeyDown,
      highlightedOption,
      minWidth,
      onRef,
      beforeOptionsComponent,
      afterOptionsComponent,
      ...otherProps
    } = this.props;
    return (
      <div
        className={cx('PowerSelect__Menu', className && `${className}__Menu`)}
        tabIndex="1"
        onKeyDown={event => {
          handleKeyDown(event, highlightedOption);
        }}
        style={{ minWidth }}
        ref={dropdownMenu => this.props.onRef(dropdownMenu)}
      >
        {beforeOptionsComponent && renderComponent(beforeOptionsComponent, { select })}

        {children}

        {afterOptionsComponent && renderComponent(afterOptionsComponent, { select })}
      </div>
    );
  }
}
