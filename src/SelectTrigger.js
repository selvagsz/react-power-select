import React, { Component } from 'react';
import cx from 'classnames';
import { renderComponent } from './utils';
import RenderOption from './RenderOption';

export default ({
  selectedOption,
  optionLabelPath,
  selectedOptionComponent,
  triggerLHSComponent,
  triggerRHSComponent,
  placeholder,
  onClick,
  showClear,
  onClearClick,
  select,
}) => {
  return (
    <div
      className={cx('PowerSelect__Trigger', {
        'PowerSelect__Trigger--empty': !selectedOption,
      })}
      onClick={onClick}
    >
      {triggerLHSComponent &&
        <div className="PowerSelect__Trigger__LHS">
          {renderComponent(triggerLHSComponent, { select })}
        </div>}

      <div className="PowerSelect__TriggerLabel">
        {selectedOption
          ? <RenderOption
              option={selectedOption}
              optionLabelPath={optionLabelPath}
              optionComponent={selectedOptionComponent}
              select={select}
            />
          : <span className="PowerSelect__Placeholder">{placeholder}</span>}
      </div>

      {triggerRHSComponent &&
        <div className="PowerSelect__Trigger__RHS">
          {renderComponent(triggerRHSComponent, { select })}
        </div>}

      {showClear &&
        <span className="PowerSelect__Clear" onClick={onClearClick} />}

      <span className="PowerSelect__TriggerStatus" />
    </div>
  );
};
