import React, { isValidElement, cloneElement } from 'react';

export default props => {
  let { option, optionLabelPath, optionComponent, select } = props;
  let OptionComponent = optionComponent;

  if (isValidElement(OptionComponent)) {
    return cloneElement(OptionComponent, props);
  }

  if (OptionComponent) {
    return <OptionComponent {...props} />;
  }

  if (typeof option === 'object') {
    if (optionLabelPath) {
      return <span>{option[optionLabelPath]}</span>;
    }
  }

  if (typeof option === 'string') {
    return <span>{option}</span>;
  }

  return null;
};
