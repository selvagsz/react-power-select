import React, { isValidElement, cloneElement } from 'react';
import { renderComponent } from '../utils';

export default function SelectedOption(props) {
  let {
    option,
    optionLabelPath,
    selectedOptionComponent,
    showOptionClose,
    onCloseClick,
    select,
  } = props;
  let value = null;
  if (typeof option === 'object') {
    if (optionLabelPath) {
      value = option[optionLabelPath];
    }
  }
  if (typeof option === 'string') {
    value = option;
  }
  return (
    <li className="PowerSelectMultiple__SelectedOption">
      <span className="PowerSelectMultiple__SelectedOption__Label">
        {selectedOptionComponent ? (
          renderComponent(selectedOptionComponent, { option, select })
        ) : (
          value
        )}
      </span>
      {showOptionClose ? (
        <span
          className="PowerSelectMultiple__SelectedOption__Close"
          onClick={event => {
            event.stopPropagation();
            onCloseClick({ option, select });
          }}
        >
          ×
        </span>
      ) : null}
    </li>
  );
}
