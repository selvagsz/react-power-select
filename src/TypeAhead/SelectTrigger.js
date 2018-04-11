import React, { Component } from 'react';
import TriggerWrapper from '../TriggerWrapper';
import AutoResizeInput from '../AutoResizeInput';

export default class SelectTrigger extends Component {
  state = {};

  componentWillMount() {
    let value = this.getValueFromSelectedOption(this.props);
    this.setState({ value });
  }

  componentWillReceiveProps(nextProps) {
    let value =
      nextProps.searchTerm !== null
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

  handleInputChange = event => {
    this.setState({
      value: event.target.value,
    });
    this.props.handleOnChange(event);
  };

  render() {
    let {
      select,
      placeholder,
      disabled,
      autoFocus,
      handleOnChange,
      handleKeyDown,
      handleOnFocus,
      handleOnBlur,
      ...rest
    } = this.props;
    let value = this.state.value;

    return (
      <TriggerWrapper value={value} select={select} {...rest}>
        <div className="PowerSelect__TriggerInputContainer">
          <AutoResizeInput
            className="PowerSelect__TriggerInput"
            autoComplete="off"
            spellCheck="false"
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoFocus={autoFocus}
            onChange={this.handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        </div>
      </TriggerWrapper>
    );
  }
}
