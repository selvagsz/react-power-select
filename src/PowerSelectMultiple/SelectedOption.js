import React, { isValidElement, cloneElement } from 'react';

export default props => {
  let {
    option,
    optionLabelPath,
    selectedOptionComponent,
    showOptionClose,
    onCloseClick,
    select,
  } = props;
  let value = null;
  let SelectedOptionComponent = selectedOptionComponent;
  if (isValidElement(SelectedOptionComponent)) {
    return cloneElement(SelectedOptionComponent, props);
  }
  if (SelectedOptionComponent) {
    return <SelectedOptionComponent {...props} />;
  }
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
        {value}
      </span>
      {showOptionClose
        ? <span
            className="PowerSelectMultiple__SelectedOption__Close"
            onClick={event => {
              event.stopPropagation();
              onCloseClick({ option, select });
            }}
          >
            ×
          </span>
        : null}
    </li>
  );
};
