import React, { Component } from 'react';
import cx from 'classnames';
import { renderComponent } from './utils';

export default function TriggerWrapper({
  value,
  select,
  showClear,
  onClearClick,
  triggerLHSComponent,
  triggerRHSComponent,
  children,
}) {
  return (
    <div
      className={cx('PowerSelect__Trigger', {
        'PowerSelect__Trigger--empty': !value,
      })}
    >
      {triggerLHSComponent && (
        <div className="PowerSelect__Trigger__LHS">
          {renderComponent(triggerLHSComponent, { select })}
        </div>
      )}

      {children}

      {showClear && <span className="PowerSelect__Clear" onClick={onClearClick} />}
      <span className="PowerSelect__TriggerStatus" />
      {triggerRHSComponent && (
        <div className="PowerSelect__Trigger__RHS">
          {renderComponent(triggerRHSComponent, { select })}
        </div>
      )}
    </div>
  );
}
