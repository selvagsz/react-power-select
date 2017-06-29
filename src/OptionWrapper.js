import React from 'react';
import Option from './Option';

export default ({
  option,
  optionLabelPath,
  optionComponent,
  isHighlighted,
  onOptionClick,
  select,
}) =>
  <div
    className={`PowerSelect__Option ${isHighlighted
      ? 'PowerSelect__Option--highlighted'
      : ''}`}
    onClick={onOptionClick}
  >
    <Option
      option={option}
      optionLabelPath={optionLabelPath}
      optionComponent={optionComponent}
      select={select}
    />
  </div>;
