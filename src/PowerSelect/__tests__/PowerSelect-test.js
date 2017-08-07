// /* global describe, it, expect */
import React from 'react';
import PowerSelect from '../index';
import { ReactWrapper, shallow, mount } from 'enzyme';

const frameworks = ['React', 'Ember', 'Angular', 'Vue', 'Inferno'];

describe('<PowerSelect />', () => {
  class PowerSelectWrapper extends React.Component {
    constructor() {
      super(...arguments);
      this.state = {
        options: this.props.options,
        selected: this.props.selected,
      };
    }

    handleChange = ({ option }) => {
      this.setState({ selected: option });
    };

    render() {
      return (
        <PowerSelect
          ref={powerselect => {
            this.powerselect = powerselect;
          }}
          options={this.state.options}
          selected={this.state.selected}
          onChange={this.handleChange}
        />
      );
    }
  }

  it('should render the container tag', () => {
    const wrapper = mount(<PowerSelectWrapper options={frameworks} />);

    expect(wrapper.find('.PowerSelect').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Trigger').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerLabel').length).toBe(1);
    expect(wrapper.find('.PowerSelect__Clear').length).toBe(1);
    expect(wrapper.find('.PowerSelect__TriggerStatus').length).toBe(1);
  });

  it('should open on trigger click', () => {
    const wrapper = mount(<PowerSelectWrapper options={frameworks} />);

    expect(document.body.querySelector('.PowerSelect__Menu')).toBeFalsy();
    wrapper.find('.PowerSelect__Trigger').simulate('click');
    expect(wrapper.find('.PowerSelect').length).toBe(1);
    expect(
      wrapper.find('.PowerSelect').hasClass('PowerSelect--open')
    ).toBeTruthy();
    expect(document.body.querySelector('.PowerSelect__Menu')).toBeTruthy();
  });

  it('select option on option click', () => {
    const wrapper = mount(<PowerSelectWrapper options={frameworks} />);
    wrapper.find('.PowerSelect__Trigger').simulate('click');

    const portal = new ReactWrapper(
      wrapper.instance().powerselect.select.dropdownRef,
      true
    );

    portal.find('.PowerSelect__Options').childAt(1).simulate('click');
    // expect(wrapper.find('.PowerSelect').hasClass('PowerSelect--open')).toBeFalsy()
    expect(wrapper.find('.PowerSelect__TriggerLabel').text()).toBe(
      frameworks[1]
    );
  });
});
