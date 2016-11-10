'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  return React.createElement(
    'div',
    {
      className: 'after-options',
      onClick: props.onAfterOptionClick
    },
    props.label
  );
};