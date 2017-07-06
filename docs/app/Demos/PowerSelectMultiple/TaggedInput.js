import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';

// Hide the caret via css

// .TaggedInput {
//   .PowerSelect__TriggerStatus {
//     visibility: hidden;
//   }
// }

class TaggedInput extends Component {
  render() {
    return (
      <PowerSelectMultiple
        className="TaggedInput"
        options={this.props.selected}
        {...this.props}
      />
    );
  }
}

export default class TaggedInputDemo extends Component {
  state = {
    urls: [],
  };

  handleChange = ({ options }) => {
    this.setState({ urls: options });
  };

  render() {
    return (
      <div className="demo">
        <h3>Tagged Input Component</h3>
        <TaggedInput
          selected={this.state.urls}
          onChange={this.handleChange}
          onSearchInputChange={(event, { select }) => {
            let value = event.target.value;
            if (value.length > 1 && value.charAt(value.length - 1) === ',') {
              this.setState({
                options: this.state.urls.push(value.slice(0, value.length - 1)),
              });
              select.search('');
              select.focus();
            }
          }}
        />
      </div>
    );
  }
}
