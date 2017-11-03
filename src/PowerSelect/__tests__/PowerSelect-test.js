// /* global describe, it, expect */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { ReactWrapper, shallow, mount } from 'enzyme';
import PowerSelect from '../index';

const KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27,
  ENTER: 13,
  TAB: 9,
};
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

  triggerKeydown(keyCode, count = 1) {
    let component = this.mountedComponent.find('.PowerSelect');

    for (let i = 0; i < count; i++) {
      component.simulate('keyDown', {
        which: keyCode,
        keyCode,
      });
    }
  }

  isOptionHighlighted(index) {
    return (
      this.portal.exists() &&
      this.portal
        .find('.PowerSelect__Options')
        .childAt(index)
        .hasClass('PowerSelect__Option--highlighted')
    );
  }

  clickOption(index) {
    this.portal
      .find('.PowerSelect__Options')
      .childAt(index)
      .simulate('click');
  }

  enterSearchText(string) {
    this.portal.find('.PowerSelect__SearchInput').simulate('change', {
      target: {
        value: string,
      },
    });
  }

  getVisibleOptions() {
    return this.portal.find('.PowerSelect__Options').children();
  }

  getVisibleOptionAtIndex(index) {}
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

  it('should render the options in the dropdown');

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

  it('should highlight the above/below option on up/down arrow press', () => {
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();

    expect(powerselect.isOptionHighlighted(0)).toBeFalsy();
    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW);
    expect(powerselect.isOptionHighlighted(0)).toBeTruthy();

    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW, 3);
    expect(powerselect.isOptionHighlighted(0)).toBeFalsy();
    expect(powerselect.isOptionHighlighted(3)).toBeTruthy();

    powerselect.triggerKeydown(KEY_CODES.UP_ARROW);
    expect(powerselect.isOptionHighlighted(3)).toBeFalsy();
    expect(powerselect.isOptionHighlighted(2)).toBeTruthy();

    powerselect.triggerKeydown(KEY_CODES.UP_ARROW, 2);
    expect(powerselect.isOptionHighlighted(0)).toBeTruthy();
  });

  it('should highlight the first/last option on circular', () => {
    let optionsCount = countries.length;
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();
    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW, optionsCount);

    expect(powerselect.isOptionHighlighted(optionsCount - 1)).toBeTruthy();
    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW);
    expect(powerselect.isOptionHighlighted(0)).toBeTruthy();
    powerselect.triggerKeydown(KEY_CODES.UP_ARROW);
    expect(powerselect.isOptionHighlighted(optionsCount - 1)).toBeTruthy();
  });

  it('should highlight the selected option when opened', () => {
    let selectionIndex = 2;
    const wrapper = powerselect.renderWithProps({
      selected: countries[selectionIndex],
    });
    powerselect.triggerContainerClick();
    expect(powerselect.isOptionHighlighted(selectionIndex)).toBeTruthy();
  });

  // it('should make the highlighted option within viewport');

  it('should select the option when click', () => {
    let optionIndex = 2;
    let optionToBeSelected = countries[2];
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();

    powerselect.clickOption(optionIndex);
    let args = powerselect.handleChange.getCall(0).args[0];
    expect(powerselect.handleChange.calledOnce).toBeTruthy();

    expect(args.option).toBe(optionToBeSelected);
    expect(args.select).toBeTruthy();

    wrapper.setProps({
      selected: args.option,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(optionToBeSelected.name);
  });

  it('should select the option on tab & focusout', () => {
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();

    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW, 2);
    powerselect.triggerKeydown(KEY_CODES.TAB);

    let args = powerselect.handleChange.getCall(0).args[0];
    expect(powerselect.handleChange.calledOnce).toBeTruthy();

    expect(args.option).toBe(countries[1]);
    expect(args.select).toBeTruthy();

    wrapper.setProps({
      selected: args.option,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(countries[1].name);
  });

  it('should select the option on enter & focusin', () => {
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();

    powerselect.triggerKeydown(KEY_CODES.DOWN_ARROW, 2);
    powerselect.triggerKeydown(KEY_CODES.ENTER);

    let args = powerselect.handleChange.getCall(0).args[0];
    expect(powerselect.handleChange.calledOnce).toBeTruthy();

    expect(args.option).toBe(countries[1]);
    expect(args.select).toBeTruthy();

    wrapper.setProps({
      selected: args.option,
    });
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(countries[1].name);
  });

  it('should close dropdown on escape press', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const wrapper = powerselect.renderWithProps();

    powerselect.triggerContainerClick();
    expect(powerselect.isOpened).toBeTruthy();

    // Should re-check this
    map.keydown({
      which: KEY_CODES.ESCAPE,
      keyCode: KEY_CODES.ESCAPE,
    });

    expect(powerselect.isOpened).toBeFalsy();
  });

  it('should filter the options based on the searchTerm', () => {
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();
    let optionsCount = powerselect.getVisibleOptions().length;
    powerselect.enterSearchText('in');
    let filteredOptions = powerselect.getVisibleOptions();
    let filteredOptionsCount = filteredOptions.length;

    expect(filteredOptionsCount).toBeLessThan(optionsCount);

    for (let i = 0; i < filteredOptionsCount; i++) {
      expect(filteredOptions.at(i).text()).toMatch(/in/gi);
    }

    powerselect.enterSearchText('');
    expect(powerselect.getVisibleOptions().length).toBeGreaterThan(filteredOptionsCount);
    expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  });

  it('should use custom `matcher` func when provided', () => {
    const matcher = ({ option, searchTerm = '', searchIndices }) => {
      return option[searchIndices].toLowerCase().indexOf(searchTerm) !== -1;
    };

    const wrapper = powerselect.renderWithProps({
      matcher,
    });

    powerselect.triggerContainerClick();
    let optionsCount = powerselect.getVisibleOptions().length;
    powerselect.enterSearchText('abc');
    expect(powerselect.getVisibleOptions().length).toBe(0);
    powerselect.enterSearchText('');
    expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
    powerselect.enterSearchText('india');
    expect(powerselect.getVisibleOptions().length).toBe(1);
    powerselect.enterSearchText('');
    expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  });

  it('should reset the filter when the dropdown is closed', () => {
    const wrapper = powerselect.renderWithProps();
    powerselect.triggerContainerClick();
    let optionsCount = powerselect.getVisibleOptions().length;
    powerselect.enterSearchText('in');
    expect(powerselect.getVisibleOptions().length).toBeLessThan(optionsCount);

    powerselect.triggerContainerClick(); // close it
    powerselect.triggerContainerClick(); // open again
    expect(powerselect.getVisibleOptions().length).toBe(optionsCount);
  });

  it('should trigger `onFocus` when the powerselect is focused', () => {
    const handleOnFocus = sinon.spy();
    const wrapper = powerselect.renderWithProps({
      onFocus: handleOnFocus,
    });

    expect(handleOnFocus.calledOnce).toBeFalsy();
    wrapper.find('.PowerSelect').simulate('focus');
    expect(handleOnFocus.calledOnce).toBeTruthy();

    let args = handleOnFocus.getCall(0).args;
    expect(args.length).toBe(2);
    expect(args[0].type).toBe('focus');
    expect(args[1].select).toBeTruthy();
  });

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
