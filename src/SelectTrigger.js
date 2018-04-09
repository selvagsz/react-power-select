import React, { Component } from 'react';
import RenderOption from './RenderOption';
import TriggerWrapper from './TriggerWrapper';

export default function Trigger({
  selectedOption: option,
  optionLabelPath,
  selectedOptionComponent,
  placeholder,
  select,
  ...rest
}) {
  return (
    <TriggerWrapper value={option} select={select} {...rest}>
      <div className="PowerSelect__TriggerLabel">
        {option ? (
          selectedOptionComponent({ option, select })
        ) : (
          <span className="PowerSelect__Placeholder">{placeholder}</span>
        )}
      </div>
    </TriggerWrapper>
  );
}
