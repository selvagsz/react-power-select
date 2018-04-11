// /* global describe, it, expect */
import React from 'react';
import sinon from 'sinon';
import PageObjectBase from '../../__tests__/test-utils/create-page-object';
import { frameworks, countries, KEY_CODES } from '../../__tests__/test-utils/constants';
import TypeAhead from '../index';

class TypeAheadPageObject extends PageObjectBase {
  Component = TypeAhead;

  get inputComponent() {
    return this.mountedComponent.find('.PowerSelect__TriggerInput').hostNodes();
  }

  get inputValue() {
    return this.inputComponent.props().value;
  }
}

describe('<TypeAhead />', () => {
  let powerselect;
  beforeEach(() => {
    powerselect = new TypeAheadPageObject();
  });

  afterEach(() => {
    powerselect.unmount();
  });

  it('should render the container tag', () => {
    const wrapper = powerselect.renderWithProps({
      options: frameworks,
    });
    expect(wrapper.find('.PowerSelect.TypeAhead').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Trigger').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerInputContainer').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerInput').hostNodes().length).toBe(1);
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerStatus').length).toBe(1);
  });

  it('should preselect, when `selected` is passed', () => {
    let selectedOption = frameworks[2];
    const wrapper = powerselect.renderWithProps({
      options: frameworks,
      selected: selectedOption,
    });
    expect(powerselect.inputValue).toBe(selectedOption);
  });

  it('should preselect, when `selected` is passed even with object option', () => {
    let selectedOption = countries[2];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOption,
    });
    expect(powerselect.inputValue).toBe(selectedOption.name);
  });

  it('should clear the selected option, when the clear button is clicked', () => {
    let selectedOption = countries[2];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOption,
    });
    expect(powerselect.inputValue).toBe(selectedOption.name);
    powerselect.triggerClearClick();
    expect(powerselect.handleChange.calledOnce).toBeTruthy();
    powerselect.renderChange();
    expect(powerselect.inputValue).toBeFalsy();
  });

  it('should display placeholder when passed', () => {
    const placeholder = 'Please select a country';
    const wrapper = powerselect.renderWithProps({ placeholder });
    expect(powerselect.inputComponent.props().placeholder).toBe(placeholder);
  });

  it('should be disabled, when `disabled` prop is set', () => {
    const wrapper = powerselect.renderWithProps({
      disabled: true,
    });
    expect(powerselect.isDisabled).toBeTruthy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeFalsy();
  });

  it('should pass highlightedOption to triggerComponent', () => {
    const wrapper = powerselect.renderWithProps({
      selected: countries[0],
    });
    powerselect.triggerContainerClick();
    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW);
    expect(powerselect.isOptionHighlighted(1)).toBeTruthy();
    expect(powerselect.trigger.props().highlightedOption).toBe(countries[1]);
    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW);
    expect(powerselect.isOptionHighlighted(2)).toBeTruthy();
    expect(powerselect.trigger.props().highlightedOption).toBe(countries[2]);
  });
});
