// /* global describe, it, expect */
import React from 'react';
import sinon from 'sinon';
import { ReactWrapper, shallow, mount } from 'enzyme';
import PowerSelect from '../index';

const frameworks = ['React', 'Ember', 'Angular', 'Vue', 'Inferno'];
const countries = [
  {
    name: 'Argentina',
    code: 'ARG',
    flag: 'https://restcountries.eu/data/arg.svg',
    continent: 'South America',
  },
  {
    name: 'Brazil',
    code: 'BRA',
    flag: 'https://restcountries.eu/data/bra.svg',
    continent: 'South America',
  },
  {
    name: 'Canada',
    code: 'CAN',
    flag: 'https://restcountries.eu/data/can.svg',
    continent: 'North America',
  },
  {
    name: 'China',
    code: 'CHN',
    flag: 'https://restcountries.eu/data/chn.svg',
    continent: 'Asia',
  },
  {
    name: 'India',
    code: 'IND',
    flag: 'https://restcountries.eu/data/ind.svg',
    continent: 'Asia',
  },
];

const renderPowerSelect = props => {
  let selected;
  let handleChange = () => {};
  return mount(
    <PowerSelect
      options={countries}
      selected={selected}
      optionLabelPath="name"
      onChange={handleChange}
      {...props}
    />
  );
};

const renderPowerSelectWithStringOptions = props => {
  let selected;
  let handleChange = () => {};
  return mount(
    <PowerSelect options={frameworks} selected={selected} onChange={handleChange} {...props} />
  );
};

describe('<PowerSelect />', () => {
  it('should render the container tag', () => {
    const wrapper = renderPowerSelectWithStringOptions();
    expect(wrapper.find('.PowerSelect').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Trigger').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerLabel').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerStatus').length).toBe(1);
  });

  it('should preselect, when `selected` is passed', () => {
    const wrapper = renderPowerSelectWithStringOptions({
      selected: frameworks[2],
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(frameworks[2]);
  });

  it('should preselect, when `selected` is passed even with object option', () => {
    const wrapper = renderPowerSelect({
      selected: countries[2],
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(countries[2].name);
  });

  it('should not render close button, when `showClear` is false', () => {
    const wrapper = renderPowerSelect({
      showClear: false,
    });
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(0);
  });

  it('should clear the selected option, when the clear button is clicked', () => {
    const handleChange = sinon.spy();
    const wrapper = renderPowerSelect({
      selected: countries[2],
      onChange: handleChange,
    });

    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe('Canada');
    wrapper.find('.PowerSelect__Clear').simulate('click');
    expect(handleChange.calledOnce).toBeTruthy();

    let args = handleChange.getCall(0).args[0];
    expect(args.option).toBe(undefined);
    expect(args.select).toBeTruthy();
    expect(args.select.searchTerm).toBe(null);

    wrapper.setProps({
      selected: args.option,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBeFalsy();
  });

  it.only('should delegate `className` to the container, tether & menu', () => {
    const wrapper = renderPowerSelect({
      className: 'TestPowerSelect',
    });
    expect(wrapper.find('.PowerSelect').hasClass('TestPowerSelect')).toBeTruthy();

    wrapper.find('.PowerSelect').simulate('click');
    var portal = new ReactWrapper(wrapper.instance().select.dropdownRef, true);

    expect(portal.find('.PowerSelect__Menu').hasClass('TestPowerSelect__Menu')).toBeTruthy();
    expect(document.querySelectorAll('.PowerSelect__Tether.TestPowerSelect__Tether').length).toBe(
      1
    );
  });

  it('should delegate `tabIndex` when passed');

  it('should display placeholder when passed');

  it('should render `triggerLHSComponent` when passed');

  it('should render `triggerRHSComponent` when passed');

  it('should be disabled, when `disabled` prop is set');

  it('should disable search when `searchEnabled` is false');

  it('should toggle the dropdown on click', () => {
    const wrapper = renderPowerSelect({
      selected: countries[2],
    });

    var portal = new ReactWrapper(wrapper.instance().select.dropdownRef, true);
    expect(portal.exists()).toBeFalsy();
    expect(wrapper.find('.PowerSelect').hasClass('PowerSelect--open')).toBeFalsy();

    wrapper.find('.PowerSelect').simulate('click');

    expect(wrapper.find('.PowerSelect').hasClass('PowerSelect--open')).toBeTruthy();
    portal = new ReactWrapper(wrapper.instance().select.dropdownRef, true);
    expect(portal.exists()).toBeTruthy();
    expect(document.querySelectorAll('.PowerSelect__Tether').length).toBe(1);
  });

  it('should close the dropdown on document click');

  it('should highlight the below option on down arrow press');

  it('should highlight the above option on up arrow press');

  it('should highlight the first option on down arrow press with last option highlighted');

  it('should highlight the last option on up arrow press with first option highlighted');

  it('should highlight the selected option when opened');

  it('should make the highlighted option within viewport');

  it('should select the option when click');

  it('should select the option on tab & focusout');

  it('should select the option on enter & focusin');

  it('should close dropdown on escape press');

  it('should filter the options based on the searchTerm');

  it('should use custom `matcher` func when provided');

  it('should reset the filter when the dropdown is closed');

  it('should trigger `onChange` when an option is selected or cleared');

  it('should trigger `onFocus` when the powerselect is focused');

  it('should trigger `onBlur` when the powerselect is blurred');

  it('should trigger `onOpen` when the powerselect is opened');

  it('should trigger `onClose` when the powerselect is closed');

  it('should trigger `onKeyDown` when any key is pressed');

  it('should trigger `onSearchInputChange` when searchInput changes');

  it('should render the `optionComponent`, when provided');

  it('should render the `selectedOptionComponent`, when provided');

  it('should render the `beforeOptionsComponent`, when provided');

  it('should render the `afterOptionsComponent`, when provided');

  it('should disable & prevent clicks & highlights when the option is disabled');

  it('should prevent max call limit recursion, when all options are disabled');
});
