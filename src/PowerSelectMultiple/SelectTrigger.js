import React, { Component } from 'react';
import AutoResizeInput from '../AutoResizeInput';
import SelectedOption from './SelectedOption';
import TriggerWrapper from '../TriggerWrapper';

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

  handleClearClick = event => {
    this.props.onClearClick(event, { select: this.props.select });
  };

  render() {
    let {
      selectedOption,
      optionLabelPath,
      showOptionClose,
      select,
      placeholder,
      disabled,
      autoFocus,
      handleOnChange,
      handleKeyDown,
      handleOnFocus,
      handleOnBlur,
      selectedOptionComponent,
      ...rest
    } = this.props;
    let selected = selectedOption || [];
    return (
      <TriggerWrapper
        {...rest}
        value={selected.length}
        select={select}
        onClearClick={this.handleClearClick}
      >
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
            <li className="PowerSelectMultiple_TriggerInputContainer">
              <AutoResizeInput
                className="PowerSelect__TriggerInput"
                autoComplete="off"
                spellCheck="false"
                placeholder={selected.length ? '' : placeholder}
                value={this.state.value}
                disabled={disabled}
                autoFocus={autoFocus}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
              />
            </li>
          </ul>
        </div>
      </TriggerWrapper>
    );
  }
}

SelectTrigger.defaultProps = {
  onOptionCloseClick: () => {},
};
