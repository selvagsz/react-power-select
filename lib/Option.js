'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  return React.createElement(
    'div',
    {
      className: 'option ' + (props.isHighlighted ? 'highlighted' : ''),
      onClick: props.onOptionClick
    },
    props.option
  );
};