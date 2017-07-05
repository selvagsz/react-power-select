import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import SelectTrigger from './SelectTrigger';
import DropdownMenu from './DropdownMenu';
import { matcher, flattenOptions } from './utils';

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
    this.setState({
      _flattenedOptions: flattenOptions(options),
    });
  }

  getVisibleOptions() {
    return this.state.filteredOptions || this.state._flattenedOptions;
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

    if (this.state.highlightedOption === null) {
      let { options, selected } = this.props;
      let highlightedOption = options.find(option => option === selected);
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
      searchIndices = optionLabelPath,
    } = this.props;
    let filteredOptions = null;

    if (searchTerm) {
      filteredOptions = options.filter(option => {
        return this.props.matcher({
          option,
          searchTerm,
          searchIndices,
        });
      });
    }

    if (!searchTerm || !filteredOptions.length) {
      this.setHighlightedOption({});
    }

    if (searchTerm && filteredOptions.length) {
      // let firstOption = filteredOptions[0]
      // if (searchTerm.toLowerCase() === firstOption.toLowerCase() || (optionLabelPath && searchTerm.toLowerCase() === (firstOption[optionLabelPath] || '').toLowerCase())) {
      this.setHighlightedOption(filteredOptions[0]);
      // }
    }

    this.setState(
      {
        filteredOptions,
        searchTerm,
      },
      callback
    );
  };

  handleSearchInputChange = event => {
    let value = event.target.value;
    this.search(value, this.open);
    this.props.onSearchInputChange(event, { select: this.getPublicApi() });
  };

  validateAndHighlightOption(highlightedOption, counter) {
    let options = this.getVisibleOptions();
    let isValidOptionAvailable = !!options.find(option => !option.disabled);

    if (isValidOptionAvailable) {
      let currentIndex = options.indexOf(highlightedOption);
      let nextIndex = currentIndex + counter;
      nextIndex = nextIndex === -1
        ? options.length - 1
        : nextIndex === options.length ? 0 : nextIndex;

      let newHighlightedOption = options[nextIndex];
      if (newHighlightedOption && newHighlightedOption.disabled) {
        return this.validateAndHighlightOption.call(
          this,
          newHighlightedOption,
          counter
        );
      }
      this.setHighlightedOption(newHighlightedOption);
    }
  }

  handleDownArrow(event, highlightedOption) {
    this.validateAndHighlightOption(highlightedOption, 1);
  }

  handleUpArrow(event, highlightedOption) {
    this.validateAndHighlightOption(highlightedOption, -1);
  }

  handleEnterPress(event, highlightedOption) {
    if (this.state.isOpen) {
      this.selectOption(highlightedOption);
      this.focusField();
      this.close();
    }
    if (!highlightedOption) {
      this.props.onEnter(event, { select: this.getPublicApi() });
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

    if (this.props.closeOnOptionClick) {
      this.close();
    }
  };

  getPublicApi() {
    let { isOpen, searchTerm } = this.state;

    return {
      open: this.open,
      close: this.close,
      toggle: this.toggle,
      search: this.search,
      focus: this.focusField,
      isOpen,
      searchTerm,
    };
  }

  render() {
    let {
      onRef,
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
            if (onRef) {
              onRef(powerselect);
            }
          }}
          className={`PowerSelect ${className} ${disabled
            ? 'PowerSelect--disabled'
            : ''} ${isOpen ? 'PowerSelect--open' : ''} ${focused
            ? 'PowerSelect--focused'
            : ''} ${searchTerm ? 'PowerSelect__WithSearch' : ''}`}
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

Select.displayName = 'Select';
Select.defaultProps = {
  options: [],
  disabled: false,
  tabIndex: 0,
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
  onEnter: noop,
  onOpen: noop,
  onClose: noop,

  closeOnOptionClick: true,
  onSearchInputChange: noop,
};
