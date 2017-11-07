// /* global describe, it, expect */
import React from 'react';
import sinon from 'sinon';
import PageObjectBase from '../../__tests__/utils/create-page-object';
import { frameworks, countries, KEY_CODES } from '../../__tests__/utils/constants';
import PowerSelectMultiple from '../index';

class PowerSelectMultiplePageObject extends PageObjectBase {
  Component = PowerSelectMultiple;

  renderWithProps(props = {}) {
    if (!props.selected) {
      props.selected = [];
    }
    return super.renderWithProps(props);
  }

  get renderedSelectedOptions() {
    return this.mountedComponent.find('.PowerSelectMultiple__SelectedOption');
  }

  get triggerInput() {
    return this.mountedComponent.find('.PowerSelect__TriggerInput');
  }

  getSelectedOptionAt(index) {
    return this.renderedSelectedOptions.at(index);
  }

  getSelectedOptionLabelAt(index) {
    return this.getSelectedOptionAt(index)
      .find('.PowerSelectMultiple__SelectedOption__Label')
      .text();
  }

  getSelectedOptionCloseAt(index) {
    return this.renderedSelectedOptions
      .at(index)
      .find('.PowerSelectMultiple__SelectedOption__Close');
  }

  triggerOptionClearAt(index) {
    return this.getSelectedOptionCloseAt(index).simulate('click');
  }

  triggerSelectedOptionClickAt(index) {
    return this.getSelectedOptionAt(index).simulate('click');
  }

  renderChange() {
    let args = this.handleChange.lastCall.args[0];
    this.mountedComponent.setProps({
      selected: args.options,
    });
  }

  isOptionsPresentInDropdown(options) {
    let selectedOptions = options || this.handleChange.lastCall.args[0].options;
    let dropdownOptions = this.portal.props().options;
    return selectedOptions.some(option => dropdownOptions.includes(option));
  }
}

describe('<PowerSelectMultiple />', () => {
  let powerselect;
  beforeEach(() => {
    powerselect = new PowerSelectMultiplePageObject();
  });

  afterEach(() => {
    powerselect.unmount();
  });

  it('should render the container tag', () => {
    const wrapper = powerselect.renderWithProps({
      options: frameworks,
    });
    expect(wrapper.find('.PowerSelect.PowerSelectMultiple').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Trigger').length).toBe(1);
    expect(wrapper.find('.PowerSelectMultiple__OptionsContainer').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerInput').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerStatus').length).toBe(1);
  });

  it('should preselect options, when `selected` is passed', () => {
    let selectedOptions = [frameworks[2], frameworks[3]];
    const wrapper = powerselect.renderWithProps({
      options: frameworks,
      selected: selectedOptions,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(selectedOptions.length);
    expect(powerselect.getSelectedOptionLabelAt(0)).toBe(selectedOptions[0]);
    expect(powerselect.getSelectedOptionLabelAt(1)).toBe(selectedOptions[1]);
  });

  it('should preselect, when `selected` is passed even with object option', () => {
    let selectedOptions = [countries[2], countries[3]];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOptions,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(selectedOptions.length);
    expect(powerselect.getSelectedOptionLabelAt(0)).toBe(selectedOptions[0].name);
    expect(powerselect.getSelectedOptionCloseAt(0).length).toBe(1);
    expect(powerselect.getSelectedOptionLabelAt(1)).toBe(selectedOptions[1].name);
    expect(powerselect.getSelectedOptionCloseAt(1).length).toBe(1);
  });

  it("should clear the option, when the option's close icon is clicked", () => {
    let selectedOptions = [countries[2], countries[3]];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOptions,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(selectedOptions.length);
    powerselect.triggerOptionClearAt(0);
    expect(powerselect.handleChange.calledOnce).toBeTruthy();
    let args = powerselect.handleChange.getCall(0).args[0];
    expect(args.options.length).toBe(selectedOptions.length - 1);
    expect(args.options).toEqual([selectedOptions[1]]);
    expect(args.select).toBeTruthy();
    expect(args.select.searchTerm).toBe(null);
    wrapper.setProps({
      selected: args.options,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(selectedOptions.length - 1);
  });

  it('should clear the selected option, when the clear button is clicked', () => {
    let selectedOptions = [countries[2], countries[3]];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOptions,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(selectedOptions.length);
    powerselect.triggerClearClick();
    expect(powerselect.handleChange.calledOnce).toBeTruthy();
    let args = powerselect.handleChange.getCall(0).args[0];
    expect(args.options).toEqual([]);
    expect(args.select).toBeTruthy();
    expect(args.select.searchTerm).toBe(null);
    wrapper.setProps({
      selected: args.options,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(0);
  });

  it('should display placeholder when passed', () => {
    const placeholder = 'Please select a country';
    const wrapper = powerselect.renderWithProps({ placeholder });
    expect(powerselect.triggerInput.props().placeholder).toBeTruthy();
    expect(powerselect.triggerInput.props().placeholder).toBe(placeholder);
    wrapper.setProps({ selected: [countries[2]] });
    expect(powerselect.triggerInput.props().placeholder).toBeFalsy();
  });

  it('should be disabled, when `disabled` prop is set', () => {
    let selectedOptions = [countries[2], countries[3]];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOptions,
      disabled: true,
    });
    expect(powerselect.container.hasClass('PowerSelect--disabled')).toBeTruthy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeFalsy();
    powerselect.triggerClearClick();
    expect(powerselect.isOpened).toBeFalsy();
    powerselect.triggerOptionClearAt(0);
    expect(powerselect.isOpened).toBeFalsy();
  });

  it('should toggle the dropdown on click', () => {
    const wrapper = powerselect.renderWithProps({
      selected: [countries[2]],
    });
    expect(powerselect.isOpened).toBeFalsy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeTruthy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeFalsy();
    powerselect.triggerSelectedOptionClickAt(0);
    expect(powerselect.isOpened).toBeTruthy();
    powerselect.triggerSelectedOptionClickAt(0);
    expect(powerselect.isOpened).toBeFalsy();
  });

  it('should remove the options from the dropdown when selected', () => {
    const wrapper = powerselect.renderWithProps();
    expect(powerselect.renderedSelectedOptions.length).toBe(0);
    powerselect.triggerContainerClick();
    powerselect.clickOption(1);
    powerselect.renderChange();
    expect(powerselect.renderedSelectedOptions.length).toBe(1);
    expect(powerselect.isOptionsPresentInDropdown()).toBeFalsy();
    powerselect.clickOption(2);
    powerselect.renderChange();
    expect(powerselect.renderedSelectedOptions.length).toBe(2);
    expect(powerselect.isOptionsPresentInDropdown()).toBeFalsy();
    powerselect.clickOption(0);
    powerselect.renderChange();
    expect(powerselect.renderedSelectedOptions.length).toBe(3);
    expect(powerselect.isOptionsPresentInDropdown()).toBeFalsy();
  });

  it('should add back the options in dropdown when cleared', () => {
    let selectedOptions = countries.slice(0, 3);
    const wrapper = powerselect.renderWithProps({
      selected: selectedOptions,
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(selectedOptions.length);
    powerselect.triggerContainerClick();
    expect(powerselect.isOptionsPresentInDropdown(selectedOptions)).toBeFalsy();
    powerselect.triggerOptionClearAt(2);
    powerselect.renderChange();
    expect(powerselect.isOptionsPresentInDropdown([selectedOptions[2]])).toBeTruthy();
    powerselect.triggerOptionClearAt(1);
    powerselect.renderChange();
    expect(powerselect.isOptionsPresentInDropdown([selectedOptions[1]])).toBeTruthy();
    powerselect.triggerOptionClearAt(0);
    powerselect.renderChange();
    expect(powerselect.isOptionsPresentInDropdown([selectedOptions[0]])).toBeTruthy();
    expect(powerselect.renderedSelectedOptions.length).toBe(0);
  });

  // Bugfix https://github.com/selvagsz/react-power-select/issues/19
  it('should add/remove options from dropdown even when dropdown is closed & opened', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = powerselect.renderWithProps();

    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeTruthy();
    powerselect.clickOption(1);
    powerselect.renderChange();

    // Trigger document click. Should re-check this
    map.click({
      target: {
        closest: function(selector) {
          return false;
        },
      },
    });
    expect(powerselect.isOpened).toBeFalsy();

    powerselect.triggerContainerClick();
    powerselect.clickOption(1);
    powerselect.renderChange();
    expect(powerselect.renderedSelectedOptions.length).toBe(2);
    expect(powerselect.isOptionsPresentInDropdown()).toBeFalsy();
  });

  // it('should highlight the selected option when opened', () => {
  //   let selectionIndex = 2;
  //   const wrapper = powerselect.renderWithProps({
  //     selected: countries[selectionIndex],
  //   });
  //   powerselect.triggerContainerClick();
  //   expect(powerselect.isOptionHighlighted(selectionIndex)).toBeTruthy();
  // });

  // // it('should make the highlighted option within viewport');

  // it('should select the option when click', () => {
  //   let optionIndex = 2;
  //   let optionToBeSelected = countries[2];
  //   const wrapper = powerselect.renderWithProps();
  //   powerselect.triggerContainerClick();

  //   powerselect.clickOption(optionIndex);
  //   let args = powerselect.handleChange.getCall(0).args[0];
  //   expect(powerselect.handleChange.calledOnce).toBeTruthy();

  //   expect(args.option).toBe(optionToBeSelected);
  //   expect(args.select).toBeTruthy();

  //   wrapper.setProps({
  //     selected: args.option,
  //   });
  //   expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(optionToBeSelected.name);
  // });

  // it('should select the option on tab & focusout', () => {
  //   const wrapper = powerselect.renderWithProps();
  //   powerselect.triggerContainerClick();

  //   powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW, 2);
  //   powerselect.triggerKeydown(KEY_CODES.TAB);

  //   let args = powerselect.handleChange.getCall(0).args[0];
  //   expect(powerselect.handleChange.calledOnce).toBeTruthy();

  //   expect(args.option).toBe(countries[1]);
  //   expect(args.select).toBeTruthy();

  //   wrapper.setProps({
  //     selected: args.option,
  //   });
  //   expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(countries[1].name);
  // });

  // it('should select the option on enter & focusin', () => {
  //   const wrapper = powerselect.renderWithProps();
  //   powerselect.triggerContainerClick();

  //   powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW, 2);
  //   powerselect.triggerKeydown(KEY_CODES.ENTER);

  //   let args = powerselect.handleChange.getCall(0).args[0];
  //   expect(powerselect.handleChange.calledOnce).toBeTruthy();

  //   expect(args.option).toBe(countries[1]);
  //   expect(args.select).toBeTruthy();

  //   wrapper.setProps({
  //     selected: args.option,
  //   });
  //   expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(countries[1].name);
  // });

  // it('should close dropdown on escape press', () => {
  //   const map = {};
  //   document.addEventListener = jest.fn((event, cb) => {
  //     map[event] = cb;
  //   });

  //   const wrapper = powerselect.renderWithProps();

  //   powerselect.triggerContainerClick();
  //   expect(powerselect.isOpened).toBeTruthy();

  //   // Should re-check this
  //   map.keydown({
  //     which: KEY_CODES.ESCAPE,
  //     keyCode: KEY_CODES.ESCAPE,
  //   });

  //   expect(powerselect.isOpened).toBeFalsy();
  // });

  // it('should filter the options based on the searchTerm', () => {
  //   const wrapper = powerselect.renderWithProps();
  //   powerselect.triggerContainerClick();
  //   let optionsCount = powerselect.getVisibleOptions().length;
  //   powerselect.enterSearchText('in');
  //   let filteredOptions = powerselect.getVisibleOptions();
  //   let filteredOptionsCount = filteredOptions.length;

  //   expect(filteredOptionsCount).toBeLessThan(optionsCount);

  //   for (let i = 0; i < filteredOptionsCount; i++) {
  //     expect(filteredOptions.at(i).text()).toMatch(/in/gi);
  //   }

  //   powerselect.enterSearchText('');
  //   expect(powerselect.getVisibleOptions().length).toBeGreaterThan(filteredOptionsCount);
  //   expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  // });

  // it('should use custom `matcher` func when provided', () => {
  //   const matcher = ({ option, searchTerm = '', searchIndices }) => {
  //     return option[searchIndices].toLowerCase().indexOf(searchTerm) !== -1;
  //   };

  //   const wrapper = powerselect.renderWithProps({
  //     matcher,
  //   });

  //   powerselect.triggerContainerClick();
  //   let optionsCount = powerselect.getVisibleOptions().length;
  //   powerselect.enterSearchText('abc');
  //   expect(powerselect.getVisibleOptions().length).toBe(0);
  //   powerselect.enterSearchText('');
  //   expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  //   powerselect.enterSearchText('india');
  //   expect(powerselect.getVisibleOptions().length).toBe(1);
  //   powerselect.enterSearchText('');
  //   expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  // });

  // it('should reset the filter when the dropdown is closed', () => {
  //   const wrapper = powerselect.renderWithProps();
  //   powerselect.triggerContainerClick();
  //   let optionsCount = powerselect.getVisibleOptions().length;
  //   powerselect.enterSearchText('in');
  //   expect(powerselect.getVisibleOptions().length).toBeLessThan(optionsCount);

  //   powerselect.triggerContainerClick(); // close it
  //   powerselect.triggerContainerClick(); // open again
  //   expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  // });

  // it('should trigger `onFocus` when the powerselect is focused', () => {
  //   const handleOnFocus = sinon.spy();
  //   const wrapper = powerselect.renderWithProps({
  //     onFocus: handleOnFocus,
  //   });

  //   expect(handleOnFocus.calledOnce).toBeFalsy();
  //   wrapper.find('.PowerSelect').simulate('focus');
  //   expect(handleOnFocus.calledOnce).toBeTruthy();

  //   let args = handleOnFocus.getCall(0).args;
  //   expect(args.length).toBe(2);
  //   expect(args[0].type).toBe('focus');
  //   expect(args[1].select).toBeTruthy();
  // });

  // it('should trigger `onBlur` when the powerselect is blurred');

  // it('should trigger `onOpen` when the powerselect is opened');

  // it('should trigger `onClose` when the powerselect is closed');

  // it('should trigger `onKeyDown` when any key is pressed');

  // it('should trigger `onSearchInputChange` when searchInput changes');

  // it('should render the `optionComponent`, when provided');

  // it('should render the `selectedOptionComponent`, when provided');

  // it('should render the `beforeOptionsComponent`, when provided');

  // it('should render the `afterOptionsComponent`, when provided');

  // it('should disable & prevent clicks & highlights when the option is disabled');

  // it('should prevent max call limit recursion, when all options are disabled');
});
