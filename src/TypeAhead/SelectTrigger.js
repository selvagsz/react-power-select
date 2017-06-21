import React, { Component } from 'react';

export default class SelectTrigger extends Component {
  state = {};

  componentWillMount() {
    let value = this.getValueFromSelectedOption(this.props);
    this.setState({ value });
  }

  componentWillReceiveProps(nextProps) {
    let value = nextProps.searchTerm !== null
      ? nextProps.searchTerm
      : this.getValueFromSelectedOption(nextProps);
    this.setState({
      value,
    });
  }

  getValueFromSelectedOption(props = this.props) {
    let { selectedOption, selectedOptionLabelPath, optionLabelPath } = props;
    let value = '';
    selectedOptionLabelPath = selectedOptionLabelPath || optionLabelPath;

    if (selectedOption) {
      if (typeof selectedOption === 'string') {
        value = selectedOption;
      } else if (selectedOptionLabelPath) {
        value = selectedOption[selectedOptionLabelPath];
      }
    }

    return value;
  }

  render() {
    let {
      placeholder,
      disabled,
      onClick,
      handleOnChange,
      handleKeyDown,
      handleOnFocus,
      handleOnBlur,
    } = this.props;

    return (
      <div className="PowerSelect__Trigger" onClick={onClick}>
        <input
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
        <span className="PowerSelect__TriggerStatus" />
      </div>
    );
  }
}
