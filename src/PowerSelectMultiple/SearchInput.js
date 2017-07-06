import React, { Component } from 'react';

export default class SearchInput extends Component {
  state = {
    length: 0,
  };

  handleOnChange = event => {
    let value = event.target.value;
    this.setState({
      length: value.length,
    });
    this.props.onChange(event);
  };

  render() {
    let { onChange, ...rest } = this.props;
    return (
      <input
        size={this.state.length + 2}
        onChange={this.handleOnChange}
        {...rest}
      />
    );
  }
}

SearchInput.defaultProps = {
  onChange: () => {},
};
