import React, { Component } from 'react';

export default class AutoResizeInput extends Component {
  state = {};
  
  componentWillMount() {
    this.setInputSize(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setInputSize(nextProps.value);
  }

  setInputSize(value) {
    this.setState({
      length: value.length + 4,
    });
  }
  
  setInputRef(input) {
    this.input = input;

    // Focus input if autoFocus passed
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  render() {
    let { autoFocus, ...rest } = this.props;
    return <input ref={input => this.setInputRef(input)} size={this.state.length} {...rest} />;
  }
}

AutoResizeInput.defaultProps = {
  onChange: () => {},
  value: '',
};
