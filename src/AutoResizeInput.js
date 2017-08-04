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

  render() {
    return <input size={this.state.length} {...this.props} />;
  }
}

AutoResizeInput.defaultProps = {
  onChange: () => {},
  value: '',
};
