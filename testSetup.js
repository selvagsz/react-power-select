import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';

$.prototype.exists = function() {
  return !!this.length;
};

$.prototype.childAt = function(index) {
  return this.children().eq(index);
};

$.prototype.simulate = function(event, params) {
  this.trigger(event, params);
  return this;
};

$.prototype.at = function(index) {
  return this.eq(index);
};

Enzyme.configure({ adapter: new Adapter() });
