import React, { Component } from 'react';
import cx from 'classnames';

export default function Option({
  option,
  disabled,
  isHighlighted,
  optionIndex,
  onOptionClick,
  children,
}) {
  return (
    <div
      className={cx('PowerSelect__Option', {
        'PowerSelect__Option--disabled': disabled,
        'PowerSelect__Option--highlighted': isHighlighted,
      })}
      data-option-index={optionIndex}
      onClick={
        disabled ? null : (
          () => {
            onOptionClick(option);
          }
        )
      }
    >
      {children}
    </div>
  );
}
