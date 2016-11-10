'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _BeforeOptions = require('./BeforeOptions');

var _BeforeOptions2 = _interopRequireDefault(_BeforeOptions);

var _AfterOptions = require('./AfterOptions');

var _AfterOptions2 = _interopRequireDefault(_AfterOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actions = {
  38: 'handleUpArrow',
  40: 'handleDownArrow',
  13: 'handleEnterPress',
  9: 'handleTabPress'
};

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu() {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).apply(this, arguments));

    _this.state = {
      highlightedIndex: -1
    };

    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs['power-select-menu'].focus();
    }
  }, {
    key: 'handleDownArrow',
    value: function handleDownArrow(highlightedIndex) {
      this.setState({
        highlightedIndex: highlightedIndex < this.props.options.length - 1 ? ++highlightedIndex : 0
      });
    }
  }, {
    key: 'handleUpArrow',
    value: function handleUpArrow(highlightedIndex) {
      this.setState({
        highlightedIndex: highlightedIndex > 0 ? --highlightedIndex : this.props.options.length - 1
      });
    }
  }, {
    key: 'handleEnterPress',
    value: function handleEnterPress(highlightedIndex) {
      this.selectOption(highlightedIndex);
    }
  }, {
    key: 'handleTabPress',
    value: function handleTabPress(highlightedIndex) {
      this.selectOption(highlightedIndex);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event, highlightedIndex) {
      var action = this[actions[event.which]];
      if (action) {
        action.call(this, highlightedIndex);
      }
    }
  }, {
    key: 'selectOption',
    value: function selectOption(highlightedIndex) {
      this.props.onOptionClick(this.props.options[highlightedIndex]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          _onOptionClick = _props.onOptionClick,
          selected = _props.selected;
      var highlightedIndex = this.state.highlightedIndex;

      highlightedIndex = highlightedIndex !== -1 ? highlightedIndex : options.indexOf(selected);

      return _react2.default.createElement(
        'div',
        {
          ref: 'power-select-menu',
          tabIndex: '1',
          className: 'power-select-menu',
          onKeyDown: function onKeyDown(event) {
            return _this2.handleKeyDown(event, highlightedIndex);
          }
        },
        _react2.default.createElement(_BeforeOptions2.default, null),
        options.map(function (option, idx) {
          return _react2.default.createElement(_Option2.default, {
            key: idx,
            option: option,
            isHighlighted: highlightedIndex === idx,
            onOptionClick: function onOptionClick() {
              return _onOptionClick(option);
            }
          });
        }),
        _react2.default.createElement(_AfterOptions2.default, { label: 'Add...' })
      );
    }
  }]);

  return DropdownMenu;
}(_react.Component);

exports.default = DropdownMenu;