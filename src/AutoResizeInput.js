import React, { Component } from 'react';

export default class AutoResizeInput extends Component {
  state = {};

  componentWillMount() {
    this.setInputSize(this.props.value);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        this.input.focus();
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setInputSize(nextProps.value);
  }

  setInputSize(value) {
    this.setState({
      length: value.length + 4,
    });
  }

  render() {
    let { autoFocus, ...rest } = this.props;
    return <input ref={input => (this.input = input)} size={this.state.length} {...rest} />;
  }
}

AutoResizeInput.defaultProps = {
  onChange: () => {},
  value: '',
};
