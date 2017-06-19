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
    <li className="powerselectmultiple__selectedOption">
      <span className="powerselectmultiple__selectedOption__label">
        {value}
      </span>
      {showOptionClose
        ? <span
            className="powerselectmultiple__selectedOption__close"
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
