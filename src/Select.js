import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
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
  state = {
    highlightedIndex: null,
    isOpen: false,
    focused: false,
    filteredOptions: null,
    searchTerm: null,
  };

  documentEventListeners = {
    handleEscapePress: ::this.handleEscapePress,
    handleDocumentClick: ::this.handleDocumentClick,
  };

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
    let options = this.state.filteredOptions || this.props.options;
    let highlightedOption = options[highlightedIndex];

    this.setState({
      highlightedIndex,
      highlightedOption,
    });
  }

  selectOption = (highlightedIndex, option) => {
    let options = this.state.filteredOptions || this.props.options;
    let selectedOption = option || options[highlightedIndex];
    this.highlightOption(highlightedIndex);
    if (selectedOption) {
      this.props.onChange({
        option: selectedOption,
        select: this.getPublicApi(),
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

    let highlightedIndex = this.state.highlightedIndex;
    let { options, selected } = this.props;
    highlightedIndex = highlightedIndex !== null
      ? highlightedIndex
      : options.indexOf(selected);

    this.highlightOption(highlightedIndex);
    this.setState({
      isOpen: true,
    });

    this.props.onOpen({ select: this.getPublicApi() });
  };

  close = () => {
    this.highlightOption(null);
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
  };

  handleSearchInputChange = event => {
    let value = event.target.value;
    this.search(value, this.open);
    this.props.onSearchInputChange(event, { select: this.getPublicApi() });
  };

  validateAndHighlightOption({
    options = [],
    event,
    highlightedIndex,
    recursiveFn,
  }) {
    let isValidOptionAvailable = !!options.find(option => !option.disabled);
    if (isValidOptionAvailable) {
      let highlightedOption = options[highlightedIndex];
      if (highlightedOption.disabled) {
        return recursiveFn.call(this, event, highlightedIndex);
      }
      this.highlightOption(highlightedIndex);
    }
  }

  handleDownArrow(event, index) {
    let options = this.state.filteredOptions || this.props.options;
    let highlightedIndex = index < options.length - 1 ? ++index : 0;

    this.validateAndHighlightOption({
      options,
      event,
      highlightedIndex,
      recursiveFn: this.handleDownArrow,
    });
  }

  handleUpArrow(event, index) {
    let options = this.state.filteredOptions || this.props.options;
    let highlightedIndex = index > 0 && index <= options.length
      ? --index
      : options.length - 1;

    this.validateAndHighlightOption({
      options,
      event,
      highlightedIndex,
      recursiveFn: this.handleUpArrow,
    });
  }

  handleEnterPress(event, highlightedIndex) {
    if (this.state.isOpen) {
      this.selectOption(highlightedIndex);
      this.focusField();
      this.close();
    }
    if (highlightedIndex === -1) {
      this.props.onEnter(event, { select: this.getPublicApi() });
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
    this.props.onBackspacePress(event, { select: this.getPublicApi() });
  }

  handleKeyDown = (...args) => {
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
        // this.selectOption(this.state.highlightedIndex)
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

  handleOptionClick = (highlightedIndex, option) => {
    this.selectOption(highlightedIndex, option);
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
    let { highlightedIndex, highlightedOption, focused } = this.state;

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
            this.handleKeyDown(event, highlightedIndex);
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
            options={filteredOptions}
            selected={selected}
            optionLabelPath={optionLabelPath}
            optionComponent={optionComponent}
            onOptionClick={this.handleOptionClick}
            handleKeyDown={this.handleKeyDown}
            highlightedIndex={highlightedIndex}
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
  onEnter: noop,
  onOpen: noop,
  onClose: noop,

  closeOnOptionClick: true,
  onSearchInputChange: noop,
  onBackspacePress: noop,
};
