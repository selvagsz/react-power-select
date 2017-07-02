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
      children,
    } = this.props;

    return (
      <div
        className={`PowerSelect__Option ${isHighlighted
          ? 'PowerSelect__Option--highlighted'
          : ''}`}
        onClick={onOptionClick}
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
