import React, { Component } from 'react';
import Select from '../Select';
import MultiSelectTrigger from './SelectTrigger';

export default class PowerSelectMultiple extends Component {
  state = {};

  componentWillMount() {
    this.filterOptions(this.props.options, this.props.selected);
  }

  componentWillReceiveProps(nextProps) {
    this.filterOptions(nextProps.options, nextProps.selected);
  }

  handleOnChange = ({ option, select }) => {
    let { selected, onChange } = this.props;
    let options = selected.slice();
    options.push(option);
    onChange({
      options,
      select,
    });
    if (select.searchTerm) {
      select.resetSearch();
      select.focus();
    }
  };

  filterOptions(options, selected, callback) {
    let filteredOptions = options.filter(
      option => selected.indexOf(option) === -1
    );
    this.setState({ filteredOptions }, callback);
  }

  handleKeyDown = (event, { select }) => {
    if (event.which === 8) {
      let { selected, onChange } = this.props;
      let value = event.target.value;
      if (value === '' && selected.length) {
        let options = selected.slice(0, selected.length - 1);
        onChange({
          options,
          select,
        });
        select.open();
        select.focus();
      }
    }
  };

  removeOption = ({ option, select }) => {
    let { selected, onChange } = this.props;
    let options = selected.filter(opt => opt !== option);
    onChange({
      options,
      select,
    });
    select.focus();
  };

  render() {
    let { className, options, onChange, ...rest } = this.props;
    return (
      <Select
        className={`${className} PowerSelectMultiple`}
        ref={powerselect => (this.powerselect = powerselect)}
        selectTriggerComponent={props =>
          <MultiSelectTrigger
            {...props}
            showOptionClose={true}
            onOptionCloseClick={this.removeOption}
          />}
        options={this.state.filteredOptions}
        onChange={this.handleOnChange}
        closeOnSelect={false}
        onKeyDown={this.handleKeyDown}
        {...rest}
      />
    );
  }
}

PowerSelectMultiple.displayName = 'PowerSelectMultiple';
