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
    let value;
    if (this.props.autocomplete) {
      value = '';
      const { searchTerm: thisTerm } = this.props;
      const { searchTerm: nextTerm } = nextProps;

      if (thisTerm && nextTerm && thisTerm === nextTerm) {
        value = this.getValueFromHighlightedOption(nextProps);
      } else if (nextTerm === '' || nextTerm === null) {
        value = this.getValueFromHighlightedOption(nextProps);
      } else if (nextTerm !== null) {
        value = nextProps.searchTerm;
      }
    } else {
      value =
        nextProps.searchTerm !== null
          ? nextProps.searchTerm
          : this.getValueFromSelectedOption(nextProps);
    }
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

  getValueFromHighlightedOption(props = this.props) {
    let { highlightedOption, selectedOptionLabelPath, optionLabelPath } = props;
    let value = '';
    selectedOptionLabelPath = selectedOptionLabelPath || optionLabelPath;
    if (highlightedOption) {
      if (typeof highlightedOption === 'string') {
        value = highlightedOption;
      } else if (selectedOptionLabelPath) {
        value = highlightedOption[selectedOptionLabelPath];
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
