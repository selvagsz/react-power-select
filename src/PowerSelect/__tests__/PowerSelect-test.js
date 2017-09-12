// /* global describe, it, expect */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
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

class PowerSelectPageObject {
  handleChange = sinon.spy();

  renderWithProps(props) {
    let selected;
    let container;
    if (!this.container) {
      container = this.container = document.createElement('div');
      document.body.appendChild(container);
    }

    let mountedComponent = (this.mountedComponent = mount(
      <PowerSelect
        options={countries}
        selected={selected}
        optionLabelPath="name"
        onChange={this.handleChange}
        {...props}
      />,
      {
        attachTo: container,
      }
    ));
    return mountedComponent;
  }

  unmount() {
    if (this.mountedComponent) {
      this.mountedComponent.detach();
    }
  }

  get portal() {
    return new ReactWrapper(this.mountedComponent.instance().select.dropdownRef, true);
  }

  get isOpened() {
    let wrapper = this.mountedComponent;
    let hasOpenClass = wrapper.find('.PowerSelect').hasClass('PowerSelect--open');
    let isDropdownVisible = this.portal.exists();

    return isDropdownVisible && hasOpenClass;
  }

  triggerContainerClick() {
    this.mountedComponent.find('.PowerSelect').simulate('click');
  }
}

describe('<PowerSelect />', () => {
  let powerselect;
  beforeEach(() => {
    powerselect = new PowerSelectPageObject();
  });

  afterEach(() => {
    powerselect.unmount();
  });

  it('should render the container tag', () => {
    const wrapper = powerselect.renderWithProps({
      options: frameworks,
    });
    expect(wrapper.find('.PowerSelect').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Trigger').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerLabel').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerStatus').length).toBe(1);
  });

  it('should preselect, when `selected` is passed', () => {
    let selectedOption = frameworks[2];
    const wrapper = powerselect.renderWithProps({
      options: frameworks,
      selected: selectedOption,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(selectedOption);
  });

  it('should preselect, when `selected` is passed even with object option', () => {
    let selectedOption = countries[2];
    const wrapper = powerselect.renderWithProps({
      selected: selectedOption,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(selectedOption.name);
  });

  it('should not render close button, when `showClear` is false', () => {
    const wrapper = powerselect.renderWithProps({
      showClear: false,
    });
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(0);
  });

  it('should clear the selected option, when the clear button is clicked', () => {
    const wrapper = powerselect.renderWithProps({
      selected: countries[2],
    });

    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe('Canada');
    wrapper.find('.PowerSelect__Clear').simulate('click');
    expect(powerselect.handleChange.calledOnce).toBeTruthy();

    let args = powerselect.handleChange.getCall(0).args[0];
    expect(args.option).toBe(undefined);
    expect(args.select).toBeTruthy();
    expect(args.select.searchTerm).toBe(null);

    wrapper.setProps({
      selected: args.option,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBeFalsy();
  });

  it('should delegate `className` to the container, tether & menu', () => {
    const wrapper = powerselect.renderWithProps({
      className: 'TestPowerSelect',
    });
    expect(wrapper.find('.PowerSelect').hasClass('TestPowerSelect')).toBeTruthy();

    powerselect.triggerContainerClick();
    expect(
      powerselect.portal.find('.PowerSelect__Menu').hasClass('TestPowerSelect__Menu')
    ).toBeTruthy();
    expect(document.querySelectorAll('.PowerSelect__Tether.TestPowerSelect__Tether').length).toBe(
      1
    );
  });

  it('should delegate `tabIndex` when passed', () => {
    const tabIndex = 2;
    const wrapper = powerselect.renderWithProps({ tabIndex });
    expect(wrapper.find('.PowerSelect').prop('tabIndex')).toBe(tabIndex);
  });

  it('should display placeholder when passed', () => {
    const placeholder = 'Please select a country';
    const wrapper = powerselect.renderWithProps({ placeholder });
    expect(wrapper.find('.PowerSelect__Placeholder').exists()).toBeTruthy();
    expect(wrapper.find('.PowerSelect__Placeholder').text()).toBe(placeholder);

    wrapper.setProps({ selected: countries[2] });
    expect(wrapper.find('.PowerSelect__Placeholder').exists()).toBeFalsy();
  });

  it('should render `triggerLHSComponent` when passed', () => {
    const SearchIcon = <i className="icon-search" />;
    const TriggerLHSComponent = () => SearchIcon;
    const wrapper = powerselect.renderWithProps({
      triggerLHSComponent: TriggerLHSComponent,
    });

    expect(wrapper.contains(SearchIcon)).toBeTruthy();
    expect(wrapper.find('.PowerSelect__Trigger__LHS').exists()).toBeTruthy();
  });

  it('should render `triggerRHSComponent` when passed', () => {
    const SearchIcon = <i className="icon-search" />;
    const TriggerRHSComponent = () => SearchIcon;
    const wrapper = powerselect.renderWithProps({
      triggerRHSComponent: TriggerRHSComponent,
    });

    expect(wrapper.contains(SearchIcon)).toBeTruthy();
    expect(wrapper.find('.PowerSelect__Trigger__RHS').exists()).toBeTruthy();
  });

  it('should be disabled, when `disabled` prop is set', () => {
    const wrapper = powerselect.renderWithProps({
      disabled: true,
    });

    expect(wrapper.find('.PowerSelect').hasClass('PowerSelect--disabled')).toBeTruthy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeFalsy();
  });

  it('should disable search when `searchEnabled` is false', () => {
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();
    expect(powerselect.portal.find('.PowerSelect__SearchInput').exists()).toBeTruthy();

    wrapper.setProps({
      searchEnabled: false,
    });

    expect(powerselect.portal.find('.PowerSelect__SearchInput').exists()).toBeFalsy();
  });

  it('should toggle the dropdown on click', () => {
    const wrapper = powerselect.renderWithProps({
      selected: countries[2],
    });

    expect(powerselect.isOpened).toBeFalsy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeTruthy();
    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeFalsy();
  });

  it('should close the dropdown on document click', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const wrapper = powerselect.renderWithProps();

    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeTruthy();

    // Should re-check this
    map.click({
      target: {
        closest: function(selector) {
          return false;
        },
      },
    });
    expect(powerselect.isOpened).toBeFalsy();
  });

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
