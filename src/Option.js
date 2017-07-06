import React, { Component } from 'react';
import cx from 'classnames';
import RenderOption from './RenderOption';

export default class Option extends Component {
  render() {
    let {
      option,
      select,
      disabled,
      optionIndex,
      optionLabelPath,
      optionComponent,
      isHighlighted,
      onOptionClick,
    } = this.props;

    let isDisabled = disabled || option.disabled;

    return (
      <div
        className={cx('PowerSelect__Option', {
          'PowerSelect__Option--disabled': isDisabled,
          'PowerSelect__Option--highlighted': isHighlighted,
        })}
        data-option-index={optionIndex}
        onClick={() => {
          if (isDisabled) {
            return false;
          }
          onOptionClick();
        }}
      >
        <RenderOption
          option={option}
          optionLabelPath={optionLabelPath}
          optionComponent={optionComponent}
          select={select}
        />
      </div>
    );
  }
}
