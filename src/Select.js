import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Dropdown from './Dropdown';
import SelectTrigger from './SelectTrigger';
import DropdownMenu from './DropdownMenu';
import { matcher } from './utils';

const KEYCODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  TAB: 9,
  BACK_SPACE: 8,
};

const actions = {
  38: 'handleUpArrow',
  40: 'handleDownArrow',
  13: 'handleEnterPress',
  9: 'handleTabPress',
  8: 'handleBackspacePress',
};

const noop = () => {};

export default class Select extends Component {
  documentEventListeners = {
    handleEscapePress: ::this.handleEscapePress,
    handleDocumentClick: ::this.handleDocumentClick,
  };

  select = {
    open: ::this.open,
    close: ::this.close,
    toggle: ::this.toggle,
    search: ::this.search,
  };

  constructor() {
    super(...arguments);
    this.state = {
      highlightedIndex: null,
      isOpen: false,
      focused: false,
      filteredOptions: null,
      searchTerm: null,
    };

    this.open = ::this.open;
    this.close = ::this.close;
    this.toggle = ::this.toggle;
    this.selectOption = ::this.selectOption;
    this.handleOptionClick = ::this.handleOptionClick;
    this.handleKeyDown = ::this.handleKeyDown;
    this.handleSearchInputChange = ::this.handleSearchInputChange;
    this.handleFocus = ::this.handleFocus;
    this.handleBlur = ::this.handleBlur;
    this.handleClick = ::this.handleClick;
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

  highlightOption(highlightedIndex) {
    this.setState({
      highlightedIndex,
    });
  }

  selectOption(highlightedIndex, option) {
    let options = this.state.filteredOptions || this.props.options;
    let selectedOption = option || options[highlightedIndex];
    this.highlightOption(highlightedIndex);
    this.props.onChange({
      option: selectedOption,
      select: this.getPublicApi(),
    });
    this.setState({
      searchTerm: null,
    });
  }

  open() {
    if (this.props.disabled) {
      return;
    }

    let highlightedIndex = this.state.highlightedIndex;
    let { options, selected } = this.props;
    highlightedIndex = highlightedIndex !== null
      ? highlightedIndex
      : options.indexOf(selected);

    this.highlightOption(highlightedIndex);
    this.setState({
      isOpen: true,
    });

    this.props.onOpen();
  }

  close() {
    this.highlightOption(null);
    this.setState({
      isOpen: false,
      filteredOptions: null,
      searchTerm: null,
    });
    this.props.onClose();
  }

  toggle(event) {
    event && event.stopPropagation();
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  setFocusedState(focused) {
    this.setState({ focused });
  }

  focusField() {
    this.powerselect.focus();
  }

  search(searchTerm, callback) {
    let {
      options,
      optionLabelPath,
      searchIndices = optionLabelPath,
    } = this.props;

    let filteredOptions = options.filter(option => {
      return this.props.matcher({
        option,
        searchTerm,
        searchIndices,
      });
    });

    if (!searchTerm || !filteredOptions.length) {
      let highlightedIndex = -1;
      this.highlightOption(highlightedIndex);
    }

    if (searchTerm && filteredOptions.length) {
      // let firstOption = filteredOptions[0]
      // if (searchTerm.toLowerCase() === firstOption.toLowerCase() || (optionLabelPath && searchTerm.toLowerCase() === (firstOption[optionLabelPath] || '').toLowerCase())) {
      this.highlightOption(0);
      // }
    }

    this.setState(
      {
        filteredOptions,
        searchTerm,
      },
      callback
    );
  }

  handleSearchInputChange(event) {
    let value = event.target.value;
    this.search(value, this.open);
    this.props.onSearchInputChange(event);
  }

  handleDownArrow(event, index) {
    let options = this.state.filteredOptions || this.props.options;
    let highlightedIndex = index < options.length - 1 ? ++index : 0;
    this.highlightOption(highlightedIndex);
  }

  handleUpArrow(event, index) {
    let options = this.state.filteredOptions || this.props.options;
    let highlightedIndex = index > 0 && index <= options.length
      ? --index
      : options.length - 1;
    this.highlightOption(highlightedIndex);
  }

  handleEnterPress(event, highlightedIndex) {
    if (this.state.isOpen) {
      this.selectOption(highlightedIndex);
      this.focusField();
      this.close();
    }
    if (highlightedIndex === -1) {
      this.props.onEnter(event, this.getPublicApi());
    }
  }

  handleTabPress(event, highlightedIndex) {
    this.setFocusedState(false);
    if (this.state.isOpen) {
      this.selectOption(highlightedIndex);
      this.close();
    }
  }

  handleBackspacePress(event, highlightedIndex) {
    this.props.onBackspacePress(event, this.getPublicApi());
  }

  handleKeyDown(...args) {
    let [event] = args;
    let keyCode = event.which;
    let action = this[actions[keyCode]];
    if (action) {
      if (
        (keyCode === KEYCODES.UP_ARROW || keyCode === KEYCODES.DOWN_ARROW) &&
        !this.state.isOpen
      ) {
        this.open();
        return;
      }

      action.apply(this, args);
    }
  }

  handleEscapePress(event) {
    if (event.which === 27) {
      this.close();
    }
  }

  handleDocumentClick(event) {
    let $target = event.target;
    let powerselect = this.powerselect;

    if (
      !(powerselect.contains($target) || $target.closest('.powerselect__menu'))
    ) {
      let { focused, isOpen } = this.state;
      if (focused) {
        this.setFocusedState(false);
      }

      if (isOpen) {
        // this.selectOption(this.state.highlightedIndex)
        this.close();
      }
    }
  }

  handleFocus(event) {
    this.setFocusedState(true);
    this.props.onFocus(event);
  }

  handleBlur(event) {
    this.setFocusedState(false);
    this.props.onBlur(event);
  }

  handleClick(event) {
    this.toggle(event);
    this.props.onClick(event);
  }

  handleOptionClick(option) {
    this.selectOption(option);
    this.focusField();

    if (this.props.closeOnOptionClick) {
      this.close();
    }
  }

  getPublicApi() {
    let { isOpen, searchTerm } = this.state;

    return {
      ...this.select,
      isOpen,
      searchTerm,
    };
  }

  render() {
    let {
      className,
      tabIndex,
      options,
      selected,
      optionLabelPath,
      optionComponent,
      placeholder,
      disabled,
      selectedOptionComponent,
      beforeOptionsComponent,
      afterOptionsComponent,
    } = this.props;

    let { isOpen, searchTerm } = this.state;
    let filteredOptions = this.state.filteredOptions || options;
    let SelectTrigger = this.props.selectTriggerComponent;
    let selectApi = this.getPublicApi();
    let { highlightedIndex, focused } = this.state;

    return (
      <Dropdown>
        <div
          ref={powerselect => (this.powerselect = powerselect)}
          className={`powerselect ${className} ${disabled
            ? 'powerselect--disabled'
            : ''} ${isOpen ? 'powerselect--open' : ''} ${focused
            ? 'powerselect--focused'
            : ''} ${searchTerm ? 'powerselect__with-search' : ''}`}
          tabIndex={tabIndex}
          onFocus={() => {
            let triggerInput = this.powerselect.querySelector('input');
            if (triggerInput) {
              triggerInput.focus();
            }
          }}
          onKeyDown={event => {
            this.handleKeyDown(event, highlightedIndex);
          }}
        >
          <SelectTrigger
            selectedOption={selected}
            optionLabelPath={optionLabelPath}
            selectedOptionComponent={selectedOptionComponent || optionComponent}
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
            options={filteredOptions}
            selected={selected}
            optionLabelPath={optionLabelPath}
            optionComponent={optionComponent}
            onOptionClick={this.handleOptionClick}
            handleKeyDown={this.handleKeyDown}
            highlightedIndex={highlightedIndex}
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
  onEnter: noop,
  onOpen: noop,
  onClose: noop,

  closeOnOptionClick: true,
  onSearchInputChange: noop,
  onBackspacePress: noop,
};
