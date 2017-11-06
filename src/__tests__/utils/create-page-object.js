import React from 'react';
import sinon from 'sinon';
import { ReactWrapper, shallow, mount } from 'enzyme';
import { frameworks, countries } from './constants';

export default class PageObjectBase {
  handleChange = sinon.spy();

  renderWithProps(props) {
    let selected;
    let container;
    let Component = this.Component;

    if (!this.container) {
      container = this.container = document.createElement('div');
      document.body.appendChild(container);
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
