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
    <div className="powerselect__trigger" onClick={onClick}>
      <span className="powerselect__trigger-label">
        {selectedOption
          ? <Option
              optionLabelPath={optionLabelPath}
              option={selectedOption}
              optionComponent={selectedOptionComponent}
              select={select}
            />
          : <span className="powerselect__placeholder">{placeholder}</span>}
      </span>
      <span className="powerselect__trigger-status" />
    </div>
  );
};
