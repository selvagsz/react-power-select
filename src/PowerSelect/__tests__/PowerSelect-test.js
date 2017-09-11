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

describe('<PowerSelect />', () => {
  it('should render the container tag', () => {
    let handleChange = sinon.spy();
    let selected;
    const wrapper = mount(
      <PowerSelect
        options={frameworks}
        selected={selected}
        onChange={handleChange}
      />
    );

    expect(wrapper.find('.PowerSelect').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Trigger').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerLabel').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerStatus').length).toBe(1);
  });

  it('should preselect, when `selected` is passed', () => {
    let handleChange = sinon.spy();
    let selected = frameworks[2];
    const wrapper = mount(
      <PowerSelect
        options={frameworks}
        selected={selected}
        onChange={handleChange}
      />
    );
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(
      frameworks[2]
    );
  });

  it('should preselect, when `selected` is passed even with object option', () => {
    let handleChange = sinon.spy();
    let selected = countries[2];
    const wrapper = mount(
      <PowerSelect
        options={frameworks}
        optionLabelPath="name"
        selected={selected}
        onChange={handleChange}
      />
    );
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(
      countries[2].name
    );
  });

  it.only('should open the dropdown on click', () => {
    let handleChange = sinon.spy();
    let selected = countries[2];
    const wrapper = mount(
      <PowerSelect
        options={frameworks}
        optionLabelPath="name"
        selected={selected}
        onChange={handleChange}
      />
    );

    expect(
      wrapper.find('.PowerSelect').hasClass('PowerSelect--open')
    ).toBeFalsy();
    wrapper.find('.PowerSelect').simulate('click');
    expect(
      wrapper.find('.PowerSelect').hasClass('PowerSelect--open')
    ).toBeTruthy();
  });
});
