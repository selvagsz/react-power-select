import { Component } from 'react';
import Select from '../Select';
import MultiSelectTrigger from './SelectTrigger';

export default class MultiSelect extends Component {
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
      this.filterOptions(this.props.options, options, () => {
        select.search('');
      });
    }
  };

  filterOptions(options, selected, callback) {
    let filteredOptions = options.filter(
      option => selected.indexOf(option) === -1
    );

    this.setState(
      {
        filteredOptions,
      },
      callback
    );
  }

  handleBackspacePress = (event, select) => {
    let { selected, onChange } = this.props;
    let value = event.target.value;

    if (value === '' && selected.length) {
      let options = selected.slice(0, selected.length - 1);
      onChange({
        options,
        select,
      });
      select.open();
      this.focusSearchInput();
    }
  };

  removeOption = ({ option, select }) => {
    let { selected, onChange } = this.props;
    let options = selected.filter(opt => opt !== option);
    onChange({
      options,
      select,
    });
    this.focusSearchInput();
  };

  focusSearchInput() {
    setTimeout(() => {
      this.powerselect.querySelector('.PowerSelect__TriggerInput').focus();
    }, 0);
  }

  render() {
    let { className, options, onChange, showOptionClose, ...rest } = this.props;

    return (
      <Select
        className={`${className} PowerSelectMultiple`}
        onRef={powerselect => (this.powerselect = powerselect)}
        selectTriggerComponent={props =>
          <MultiSelectTrigger
            {...props}
            showOptionClose={showOptionClose}
            onOptionCloseClick={this.removeOption}
          />}
        options={this.state.filteredOptions}
        onChange={this.handleOnChange}
        closeOnOptionClick={false}
        onBackspacePress={this.handleBackspacePress}
        {...rest}
      />
    );
  }
}

MultiSelect.defaultProps = {
  showOptionClose: true,
};
