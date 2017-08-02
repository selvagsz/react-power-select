import React, { Component } from 'react';
import Option from '../Option';
import AutoResizeInput from '../AutoResizeInput';
import SelectedOption from './SelectedOption';
import { renderComponent } from '../utils';

export default class SelectTrigger extends Component {
  state = {
    value: '',
  };

  componentWillReceiveProps(nextProps) {
    let value = nextProps.searchTerm !== null ? nextProps.searchTerm : '';
    this.setState({
      value,
    });
  }

  render() {
    let {
      selectedOption,
      optionLabelPath,
      showOptionClose,
      select,
      placeholder,
      disabled,
      onClick,
      handleOnChange,
      handleKeyDown,
      handleOnFocus,
      handleOnBlur,
      selectedOptionComponent,
      triggerLHSComponent,
      triggerRHSComponent,
    } = this.props;
    let selected = selectedOption || [];
    return (
      <div className="PowerSelect__Trigger" onClick={onClick}>
        {triggerLHSComponent &&
          <div className="PowerSelect__Trigger__LHS">
            {renderComponent(triggerLHSComponent, { select })}
          </div>}

        <div className="PowerSelectMultiple__OptionsContainer">
          <ul className="PowerSelectMultiple__SelectedOptions">
            {selected.map((selectedOption, index) => {
              return (
                <SelectedOption
                  key={index}
                  option={selectedOption}
                  optionLabelPath={optionLabelPath}
                  selectedOptionComponent={selectedOptionComponent}
                  showOptionClose={showOptionClose}
                  onCloseClick={this.props.onOptionCloseClick}
                  select={select}
                />
              );
            })}
            <li>
              <AutoResizeInput
                className="PowerSelect__TriggerInput"
                autoComplete="off"
                spellCheck="false"
                placeholder={placeholder}
                value={this.state.value}
                disabled={disabled}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
              />
            </li>
          </ul>
        </div>

        {triggerRHSComponent &&
          <div className="PowerSelect__Trigger__RHS">
            {renderComponent(triggerRHSComponent, { select })}
          </div>}
        <span className="PowerSelect__TriggerStatus" />
      </div>
    );
  }
}

SelectTrigger.defaultProps = {
  onOptionCloseClick: () => {},
};
