// /* global describe, it, expect */
import React from 'react';
import sinon from 'sinon';
import PageObjectBase from '../../__tests__/test-utils/create-page-object';
import { frameworks, countries, KEY_CODES } from '../../__tests__/test-utils/constants';
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
    return this.mountedComponent.find('.PowerSelect__TriggerInput').hostNodes();
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
    let dropdownOptions = this.mountedComponent.instance().select.dropdownRef.props.options;
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
    expect(wrapper.find('.PowerSelect__TriggerInput').hostNodes().length).toBe(1);
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
    powerselect.clickOption(1);
    powerselect.renderChange();
    expect(powerselect.renderedSelectedOptions.length).toBe(3);
    expect(powerselect.isOptionsPresentInDropdown()).toBeFalsy();
  });

  it('should render custom selected option component when passed', () => {
    let selectedOptions = countries.slice(0, 3);
    const wrapper = powerselect.renderWithProps({
      selected: selectedOptions,
      selectedOptionComponent: ({ option }) => {
        return <span className="customSelectedOption">{option.name}</span>;
      },
    });
    expect(powerselect.renderedSelectedOptions.length).toBe(3);
    expect(wrapper.find('span.customSelectedOption').length).toBe(3);
    expect(
      wrapper.containsAllMatchingElements([
        <span className="customSelectedOption">{selectedOptions[0].name}</span>,
        <span className="customSelectedOption">{selectedOptions[1].name}</span>,
        <span className="customSelectedOption">{selectedOptions[2].name}</span>,
      ])
    ).toBeTruthy();
  });
});
