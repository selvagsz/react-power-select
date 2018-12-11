import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropdown from './Dropdown';
import SelectTrigger from './SelectTrigger';
import DropdownMenu from './DropdownMenu';
import {
  matcher,
  isOptGroup,
  flattenOptions,
  filterOptions,
  getNextValidOption,
  isValidOptionPresent,
} from './utils';

const KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
};

const actions = {
  [KEY_CODES.UP_ARROW]: 'handleUpArrow',
  [KEY_CODES.DOWN_ARROW]: 'handleDownArrow',
  [KEY_CODES.ENTER]: 'handleEnterPress',
  [KEY_CODES.TAB]: 'handleTabPress',
  [KEY_CODES.BACKSPACE]: 'handleBackspacePress',
};

const noop = () => {};

export default class Select extends Component {
  state = {
    highlightedOption: null,
    isOpen: false,
    focused: false,
    filteredOptions: null,
    searchTerm: null,
  };

  documentEventListeners = {
    handleEscapePress: ::this.handleEscapePress,
    handleDocumentClick: ::this.handleDocumentClick,
  };

  componentWillMount() {
    this.flattenOptions(this.props.options);
  }

  componentWillReceiveProps({ options }) {
    this.flattenOptions(options);
    if (this.props.options !== options) {
      this.setState({
        filteredOptions: options,
      });
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.documentEventListeners.handleEscapePress);
    document.addEventListener('click', this.documentEventListeners.handleDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.documentEventListeners.handleEscapePress);
    document.removeEventListener('click', this.documentEventListeners.handleDocumentClick, true);
    clearTimeout(this.focusFieldTimeout);
  }

  flattenOptions(options) {
    let { isOptGroupOptions, flattenedOptions, optGroupMap } = flattenOptions(options);
    this.isOptGroupOptions = isOptGroupOptions;
    this._optGroupMap = optGroupMap;
    this.setState({
      _flattenedOptions: flattenedOptions,
    });
  }

  getVisibleOptions() {
    return this.state.filteredOptions || this.props.options;
  }

  getFlattenedOptions() {
    return this.state._flattenedOptions;
  }

  setHighlightedOption(highlightedOption) {
    this.setState({
      highlightedOption,
    });
  }

  selectOption = option => {
    this.setHighlightedOption(option);
    this.props.onChange({
      select: this.getPublicApi(),
      option,
    });
    this.setState({
      searchTerm: null,
    });
  };

  open = () => {
    if (this.props.disabled) {
      return;
    }
    let flattenedOptions = this.getFlattenedOptions();
    if (this.state.highlightedOption === null) {
      let { selected } = this.props;
      let highlightedOption = flattenedOptions.find(option => option === selected);
      this.setHighlightedOption(highlightedOption);
    }
    this.setState({
      isOpen: true,
    });
    this.props.onOpen({ select: this.getPublicApi() });
  };

  close = () => {
    this.setState({
      isOpen: false,
    });
    this.props.onClose({ select: this.getPublicApi() });
  };

  resetSearchAndClose = () => {
    this.search(null);
    this.close();
  };

  toggle = event => {
    if (event && this.powerselect.contains(event.target)) {
      event.stopPropagation();
    }
    if (this.state.isOpen) {
      this.resetSearchAndClose();
    } else {
      this.open();
    }
  };

  resetSearch = () => {
    this.setHighlightedOption(null);
    this.setState({
      searchTerm: null,
      filteredOptions: null,
    });
  };

  setFocusedState(focused) {
    this.setState({ focused });
  }

  focusField = () => {
    this.focusFieldTimeout = setTimeout(() => {
      this.powerselect.focus();
    });
  };

  search = (searchTerm, callback) => {
    let { options, optionLabelPath, matcher, searchIndices = optionLabelPath } = this.props;
    let filteredOptions = filterOptions({
      options,
      searchTerm: searchTerm || '',
      searchIndices,
      matcher,
    });

    let { flattenedOptions } = flattenOptions(filteredOptions || []);
    if (searchTerm && flattenedOptions.length) {
      this.setHighlightedOption(flattenedOptions[0]);
    } else {
      this.setHighlightedOption(null);
    }

    this.setState(
      {
        filteredOptions,
        searchTerm,
        _flattenedOptions: flattenedOptions,
      },
      callback
    );
  };

  handleSearchInputChange = event => {
    let value = event.target.value;
    this.open();
    this.search(value);

    if (this.props.onSearchInputChange) {
      // show deprecate warning
      this.props.onSearchInputChange(event, { select: this.getPublicApi() });
    } else {
      this.props.onSearch(event, { select: this.getPublicApi() });
    }
  };

  validateAndHighlightOption(highlightedOption, counter) {
    let options = this.getFlattenedOptions();
    let isValidOptionAvailable = isValidOptionPresent(options);
    if (isValidOptionAvailable) {
      let nextValidOption = getNextValidOption({
        options,
        counter,
        currentOption: highlightedOption,
        optGroupMap: this._optGroupMap,
      });
      this.setHighlightedOption(nextValidOption);
    }
  }

  handleDownArrow(event, highlightedOption) {
    event.preventDefault();
    this.validateAndHighlightOption(highlightedOption, 1);
  }

  handleUpArrow(event, highlightedOption) {
    event.preventDefault();
    this.validateAndHighlightOption(highlightedOption, -1);
  }

  handleEnterPress(event, highlightedOption) {
    if (this.state.isOpen) {
      this.selectOption(highlightedOption);
      this.focusField();
      this.resetSearchAndClose();
    }
  }

  handleTabPress(event, highlightedOption) {
    this.setFocusedState(false);
    if (this.state.isOpen) {
      this.selectOption(highlightedOption);
      this.resetSearchAndClose();
    }
  }

  handleKeyDown = (...args) => {
    let [event] = args;
    let keyCode = event.which;
    let action = this[actions[keyCode]];
    if (action) {
      if (
        (keyCode === KEY_CODES.UP_ARROW || keyCode === KEY_CODES.DOWN_ARROW) &&
        !this.state.isOpen
      ) {
        this.open();
        return;
      }
      action.apply(this, args);
    }
    this.props.onKeyDown(event, { select: this.getPublicApi() });
  };

  handleEscapePress(event) {
    if (event.which === 27) {
      let $target = event.target;
      if (
        this.powerselect.contains($target) ||
        (this.dropdown && this.dropdown.contains($target))
      ) {
        this.resetSearchAndClose();
        this.focusField();
      }
    }
  }

  handleDocumentClick(event) {
    let $target = event.target;
    if (
      !(
        this.powerselect.contains($target) ||
        (this.dropdown && this.dropdown.contains(event.target))
      )
    ) {
      let { focused, isOpen } = this.state;
      if (focused) {
        this.setFocusedState(false);
      }
      if (isOpen) {
        this.resetSearchAndClose();
      }
    }
  }

  handleFocus = event => {
    let triggerInput = this.powerselect.querySelector('input');
    if (triggerInput) {
      triggerInput.focus();
    }
    this.setFocusedState(true);
    if (!this.state.focused) {
      this.props.onFocus(event, { select: this.getPublicApi() });
    }
  };

  handleBlur = event => {
    this.setFocusedState(false);
    this.props.onBlur(event, { select: this.getPublicApi() });
  };

  handleClick = event => {
    this.toggle(event);
    this.props.onClick(event, { select: this.getPublicApi() });
  };

  handleClearClick = event => {
    this.selectOption(undefined);
    this.resetSearchAndClose();
    this.focusField();
    event.stopPropagation();
  };

  handleOptionClick = highlightedOption => {
    this.selectOption(highlightedOption);
    this.focusField();
    if (this.props.closeOnSelect) {
      this.resetSearchAndClose();
    }
  };

  /*
   * Backspace clears field if the power select:
   * 1. is focused
   * 2. is closed
   * 3. has no search term
   * 4. is not disabled
   * 5. has clear button
   */
  handleBackspacePress() {
    if (
      this.state.focused &&
      !this.state.isOpen &&
      !this.state.searchTerm &&
      !this.props.disabled &&
      this.props.showClear
    ) {
      this.selectOption(undefined);
      this.focusField();
    }
  }

  getPublicApi() {
    let { isOpen, searchTerm } = this.state;
    return {
      isOpen,
      searchTerm,
      actions: {
        open: this.open,
        close: this.close,
        search: this.search,
        focus: this.focusField,
      },
    };
  }

  render() {
    let {
      className,
      tabIndex,
      selected,
      showClear,
      optionLabelPath,
      optionComponent,
      placeholder,
      disabled,
      selectedOptionComponent,
      selectedOptionLabelPath,
      triggerLHSComponent,
      triggerRHSComponent,
      beforeOptionsComponent,
      afterOptionsComponent,
    } = this.props;

    let { isOpen, searchTerm, highlightedOption, focused } = this.state;
    let Trigger = this.props.triggerComponent;
    let options = this.getVisibleOptions();
    let selectApi = this.getPublicApi();

    return (
      <Dropdown className={className}>
        <div
          ref={powerselect => {
            this.powerselect = powerselect;
          }}
          className={cx('PowerSelect', className, {
            'PowerSelect--disabled': disabled,
            'PowerSelect--open': isOpen,
            'PowerSelect--focused': focused,
            PowerSelect__WithSearch: searchTerm,
          })}
          tabIndex={tabIndex}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onKeyDown={event => {
            this.handleKeyDown(event, highlightedOption);
          }}
        >
          <Trigger
            selectedOption={selected}
            highlightedOption={highlightedOption}
            optionLabelPath={optionLabelPath}
            selectedOptionLabelPath={selectedOptionLabelPath}
            selectedOptionComponent={selectedOptionComponent}
            triggerLHSComponent={triggerLHSComponent}
            triggerRHSComponent={triggerRHSComponent}
            placeholder={placeholder}
            disabled={disabled}
            searchTerm={searchTerm}
            showClear={showClear}
            handleOnChange={this.handleSearchInputChange}
            onClearClick={this.handleClearClick}
            handleOnBlur={this.handleBlur}
            select={selectApi}
          />
        </div>
        {isOpen && (
          <DropdownMenu
            ref={dropdownRef => (this.dropdownRef = dropdownRef)}
            onRef={dropdown => (this.dropdown = dropdown)}
            className={className}
            minWidth={this.powerselect.offsetWidth}
            options={options}
            selected={selected}
            optionLabelPath={optionLabelPath}
            optionComponent={optionComponent}
            onOptionClick={this.handleOptionClick}
            handleKeyDown={this.handleKeyDown}
            highlightedOption={highlightedOption}
            select={selectApi}
            beforeOptionsComponent={beforeOptionsComponent}
            afterOptionsComponent={afterOptionsComponent}
          />
        )}
      </Dropdown>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  options: [],
  disabled: false,
  tabIndex: 0,
  showClear: true,
  closeOnSelect: true,
  optionLabelPath: null,
  optionComponent: null,
  triggerComponent: SelectTrigger,
  triggerLHSComponent: null,
  triggerRHSComponent: null,
  selectedOptionComponent: null,
  beforeOptionsComponent: null,
  afterOptionsComponent: null,
  matcher: matcher,
  onFocus: noop,
  onBlur: noop,
  onClick: noop,
  onKeyDown: noop,
  onOpen: noop,
  onClose: noop,
  onSearch: noop,
};
