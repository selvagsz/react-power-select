import React, { Component } from 'react';
import Option from '../Option';
import MultiSelectSearchInput from './SearchInput';
import SelectedOption from './SelectedOption';

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
    } = this.props;

    let selected = selectedOption || [];

    return (
      <div className="powerselect__trigger" onClick={onClick}>
        <div className="powerselect-multiple__optionsContainer">
          <ul className="powerselectmultiple__selectedOptions">
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
            </li>
          </ul>

          <span className="powerselect__trigger-status" />
        </div>
      </div>
    );
  }
}

SelectTrigger.defaultProps = {
  onOptionCloseClick: () => {},
};
