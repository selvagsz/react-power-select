import $ from 'jquery';
import React from 'react';
import sinon from 'sinon';
import { ReactWrapper, shallow, mount } from 'enzyme';
import { frameworks, countries } from './constants';
import TestUtils from 'react-dom/test-utils';

export default class PageObjectBase {
  handleChange = sinon.spy();

  renderWithProps(props) {
    let selected;
    let attachToContainer;
    let Component = this.Component;

    if (!this.attachToContainer) {
      attachToContainer = this.attachToContainer = document.createElement('div');
      document.body.appendChild(attachToContainer);
    }

    let mountedComponent = (this.mountedComponent = mount(
      <Component
        options={countries}
        selected={selected}
        optionLabelPath="name"
        onChange={this.handleChange}
        {...props}
      />,
      {
        attachTo: attachToContainer,
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
    return $('.PowerSelect__Tether');
  }

  get isOpened() {
    let wrapper = this.mountedComponent;
    let hasOpenClass = this.container.hasClass('PowerSelect--open');
    let isDropdownVisible = this.portal.exists();
    return isDropdownVisible && hasOpenClass;
  }

  get container() {
    return this.mountedComponent.find('.PowerSelect');
  }

  get trigger() {
    return this.mountedComponent.find('SelectTrigger');
  }

  get isDisabled() {
    return this.container.hasClass('PowerSelect--disabled');
  }

  triggerContainerClick() {
    this.container.simulate('click');
  }

  triggerClearClick() {
    this.mountedComponent.find('.PowerSelect__Clear').simulate('click');
  }

  triggerKeydown(keyCode, count = 1) {
    let component = this.container;

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
    let input = document.querySelector('input.PowerSelect__SearchInput');
    TestUtils.Simulate.change(input, { target: { value: string } });
  }

  getVisibleOptions() {
    return this.portal.find('.PowerSelect__Options').children();
  }

  renderChange() {
    let args = this.handleChange.lastCall.args[0];
    this.mountedComponent.setProps({
      selected: args.option,
    });
  }
}
