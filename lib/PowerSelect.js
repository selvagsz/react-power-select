'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PowerSelect = function (_Component) {
  _inherits(PowerSelect, _Component);

  function PowerSelect() {
    _classCallCheck(this, PowerSelect);

    var _this = _possibleConstructorReturn(this, (PowerSelect.__proto__ || Object.getPrototypeOf(PowerSelect)).apply(this, arguments));

    _this.state = {
      isOpen: false
    };
    _this.open = _this.open.bind(_this);
    _this.close = _this.close.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(PowerSelect, [{
    key: 'open',
    value: function open() {
      this.setState({
        isOpen: true
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({
        isOpen: false
      });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.state.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(option) {
      this.props.onChange(option);
      this.close();
    }
  }, {
    key: 'handleEscapePress',
    value: function handleEscapePress(event) {
      if (event.which === 27) {
        this.close();
      }
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      var $target = event.target;
      if (!($target.closest('.power-select') || $target.closest('.power-select-menu'))) {
        this.close();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleEscapePress.bind(this));
      document.addEventListener('click', this.handleDocumentClick.bind(this));
    }
  }, {
    key: 'componentWillUnMount',
    value: function componentWillUnMount() {
      document.removeEventListener('keydown', this.handleEscapePress);
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.isOpen;
      var _props = this.props,
          options = _props.options,
          selected = _props.selected;


      return _react2.default.createElement(
        _Dropdown2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'power-select ' + (isOpen ? 'open' : '') },
          _react2.default.createElement(_SelectTrigger2.default, { value: selected, onClick: this.toggle })
        ),
        isOpen && _react2.default.createElement(_DropdownMenu2.default, {
          options: options,
          selected: selected,
          onOptionClick: this.onChange
        })
      );
    }
  }]);

  return PowerSelect;
}(_react.Component);

exports.default = PowerSelect;