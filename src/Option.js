import React, { Component } from 'react';
import RenderOption from './RenderOption';

export default class Option extends Component {
  render() {
    let {
      option,
      select,
      optionLabelPath,
      optionComponent,
      isHighlighted,
      onOptionClick,
    } = this.props;

    let isDisabled = option.disabled;

    return (
      <div
        className={`PowerSelect__Option ${isDisabled
          ? 'PowerSelect__Option--disabled'
          : ''} ${isHighlighted ? 'PowerSelect__Option--highlighted' : ''}`}
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
