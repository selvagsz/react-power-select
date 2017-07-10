import React, { Component } from 'react';
import RenderOption from './RenderOption';

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
          ? <RenderOption
              option={selectedOption}
              optionLabelPath={optionLabelPath}
              optionComponent={selectedOptionComponent}
              select={select}
            />
          : <span className="PowerSelect__Placeholder">{placeholder}</span>}
      </span>
      <span className="PowerSelect__TriggerStatus" />
    </div>
  );
};
