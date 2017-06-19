import React, { Component } from 'react';
import Option from './Option';

export default ({
  selectedOption,
  optionLabelPath,
  selectedOptionComponent,
  placeholder,
  onClick,
  select,
}) => {
  return (
    <div className="PowerSelect__Trigger" onClick={onClick}>
      <span className="PowerSelect__TriggerLabel">
        {selectedOption
          ? <Option
              optionLabelPath={optionLabelPath}
              option={selectedOption}
              optionComponent={selectedOptionComponent}
              select={select}
            />
          : <span className="PowerSelect__Placeholder">{placeholder}</span>}
      </span>
      <span className="PowerSelect__TriggerStatus" />
    </div>
  );
};
