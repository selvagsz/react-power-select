import React, { Component, isValidElement, cloneElement } from 'react';

export default function RenderOption({ option, select, optionLabelPath, optionComponent }) {
  let publicProps = { option, select, optionLabelPath };
  let OptionComponent = optionComponent;
  if (isValidElement(OptionComponent)) {
    return cloneElement(OptionComponent, publicProps);
  }
  if (OptionComponent) {
    return <OptionComponent {...publicProps} />;
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
}
