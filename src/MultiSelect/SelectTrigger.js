import React, { Component } from 'react';
import Option from '../Option';
import SelectedOptions from './SelectedOptions';
import MultiSelectSearchInput from './SearchInput';

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
      select,
      placeholder,
      disabled,
      onClick,
      handleOnChange,
      handleKeyDown,
      handleOnFocus,
      handleOnBlur,
    } = this.props;

    let selected = selectedOption || [];

    return (
      <div className="powerselect__trigger" onClick={onClick}>
        <div className="powerselect-multiple__optionsContainer">
          <SelectedOptions
            selected={selected}
            optionLabelPath={optionLabelPath}
            select={select}
          />

          <MultiSelectSearchInput
            className="powerselect__trigger-input"
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
          <span className="powerselect__trigger-status" />
        </div>
      </div>
    );
  }
}
