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
};

const actions = {
  [KEY_CODES.UP_ARROW]: 'handleUpArrow',
  [KEY_CODES.DOWN_ARROW]: 'handleDownArrow',
  [KEY_CODES.ENTER]: 'handleEnterPress',
  [KEY_CODES.TAB]: 'handleTabPress',
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
  }

  componentDidMount() {
    document.addEventListener(
      'keydown',
      this.documentEventListeners.handleEscapePress
    );
    document.addEventListener(
      'click',
      this.documentEventListeners.handleDocumentClick,
      true
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.documentEventListeners.handleEscapePress
    );
    document.removeEventListener(
      'click',
      this.documentEventListeners.handleDocumentClick,
      true
    );
  }

  flattenOptions(options) {
    let { isOptGroupOptions, flattenedOptions, optGroupMap } = flattenOptions(
      options
    );
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
    if (option) {
      this.props.onChange({
        select: this.getPublicApi(),
        option,
      });
    }
    this.setState({
      searchTerm: null,
    });
  };

  open = () => {
    if (this.props.disabled) {
      return;
    }
    let flattenedOptions = this.getFlattenedOptions();
    if (this.props.closeDropdownOnEmpty && !flattenedOptions.length) {
      return this.setState({
        isOpen: false,
      });
    }
    if (this.state.highlightedOption === null) {
      let { selected } = this.props;
      let highlightedOption = flattenedOptions.find(
        option => option === selected
      );
      this.setHighlightedOption(highlightedOption);
    }
    this.setState({
      isOpen: true,
    });
    this.props.onOpen({ select: this.getPublicApi() });
  };

  close = () => {
    this.setHighlightedOption(null);
    this.setState({
      isOpen: false,
      filteredOptions: null,
      searchTerm: null,
    });
    this.props.onClose({ select: this.getPublicApi() });
  };

  toggle = event => {
    event && event.stopPropagation();
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  setFocusedState(focused) {
    this.setState({ focused });
  }

  focusField = () => {
    setTimeout(() => {
      this.powerselect.focus();
    });
  };

  search = (searchTerm, callback) => {
    let {
      options,
      optionLabelPath,
      matcher,
      searchIndices = optionLabelPath,
    } = this.props;
    let filteredOptions = null;
    if (searchTerm) {
      filteredOptions = filterOptions({
        options,
        searchTerm,
        searchIndices,
        matcher,
      });
    }
    if (!searchTerm || !filteredOptions.length) {
      this.setHighlightedOption(null);
    }
    let { flattenedOptions } = flattenOptions(filteredOptions || []);
    if (searchTerm && flattenedOptions.length) {
      this.setHighlightedOption(flattenedOptions[0]);

      // let firstOption = flattenedOptions[0];
      // let optionLabel = typeof firstOption === 'string'
      //   ? firstOption
      //   : firstOption[optionLabelPath] || '';
      // if (searchTerm.toLowerCase() === optionLabel.toLowerCase()) {
      //   this.setHighlightedOption(firstOption);
      // }
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
    this.search(value);
    this.open();
    this.props.onSearchInputChange(event, { select: this.getPublicApi() });
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
      this.close();
    }
  }

  handleTabPress(event, highlightedOption) {
    this.setFocusedState(false);
    if (this.state.isOpen) {
      this.selectOption(highlightedOption);
      this.close();
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
      this.close();
    }
  }

  handleDocumentClick(event) {
    let $target = event.target;
    let powerselect = this.powerselect;
    if (
      !(powerselect.contains($target) || $target.closest('.PowerSelect__Menu'))
    ) {
      let { focused, isOpen } = this.state;
      if (focused) {
        this.setFocusedState(false);
      }
      if (isOpen) {
        this.close();
      }
    }
  }

  handleFocus = event => {
    this.setFocusedState(true);
    this.props.onFocus(event, { select: this.getPublicApi() });
  };

  handleBlur = event => {
    this.setFocusedState(false);
    this.props.onBlur(event, { select: this.getPublicApi() });
  };

  handleClick = event => {
    this.toggle(event);
    this.props.onClick(event, { select: this.getPublicApi() });
  };

  handleOptionClick = highlightedOption => {
    this.selectOption(highlightedOption);
    this.focusField();
    if (this.props.closeOnSelect) {
      this.close();
    }
  };

  getPublicApi() {
    let { isOpen, searchTerm } = this.state;
    return {
      open: this.open,
      close: this.close,
      search: this.search,
      focus: this.focusField,
      isOpen,
      searchTerm,
    };
  }

  render() {
    let {
      className,
      tabIndex,
      selected,
      optionLabelPath,
      optionComponent,
      placeholder,
      disabled,
      selectedOptionComponent,
      beforeOptionsComponent,
      afterOptionsComponent,
    } = this.props;

    let { isOpen, searchTerm, highlightedOption, focused } = this.state;
    let SelectTrigger = this.props.selectTriggerComponent;
    let options = this.getVisibleOptions();
    let selectApi = this.getPublicApi();

    return (
      <Dropdown>
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
          onFocus={() => {
            let triggerInput = this.powerselect.querySelector('input');
            if (triggerInput) {
              triggerInput.focus();
            }
          }}
          onKeyDown={event => {
            this.handleKeyDown(event, highlightedOption);
          }}
        >
          <SelectTrigger
            selectedOption={selected}
            optionLabelPath={optionLabelPath}
            selectedOptionComponent={selectedOptionComponent}
            placeholder={placeholder}
            disabled={disabled}
            searchTerm={searchTerm}
            handleOnChange={this.handleSearchInputChange}
            onClick={this.handleClick}
            handleOnFocus={this.handleFocus}
            handleOnBlur={this.handleBlur}
            select={selectApi}
          />
        </div>
        {isOpen &&
          <DropdownMenu
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
          />}
      </Dropdown>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  options: [],
  disabled: false,
  tabIndex: 0,
  closeOnSelect: true,
  closeDropdownOnEmpty: false,
  selectTriggerComponent: SelectTrigger,
  optionLabelPath: null,
  optionComponent: null,
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
  onSearchInputChange: noop,
};
