import React, { Component } from 'react';
import RenderOption from './RenderOption';
import TriggerWrapper from './TriggerWrapper';

export default function Trigger({
  selectedOption,
  optionLabelPath,
  selectedOptionComponent,
  placeholder,
  select,
  ...rest
}) {
  return (
    <TriggerWrapper value={selectedOption} select={select} {...rest}>
      <div className="PowerSelect__TriggerLabel">
        {selectedOption ? (
          <RenderOption
            option={selectedOption}
            optionLabelPath={optionLabelPath}
            optionComponent={selectedOptionComponent}
            select={select}
          />
        ) : (
          <span className="PowerSelect__Placeholder">{placeholder}</span>
        )}
      </div>
    </TriggerWrapper>
  );
}
