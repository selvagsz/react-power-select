import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';

// Hide the caret via css

// .TaggedInput {
//   .PowerSelect__TriggerStatus {
//     visibility: hidden;
//   }
// }

class TaggedInput extends Component {
  handleOptionsChange = (value, select) => {
    if (value.length > 1 && value.charAt(value.length - 1) === ',') {
      let data = this.props.data.slice();
      data.push(value.slice(0, -1));

      this.props.onChange({
        data,
        select,
      });

      select.search('');
      select.focus();
    }
  };

  render() {
    let { data, selected, options, onSearchInputChange, ...rest } = this.props;
    return (
      <PowerSelectMultiple
        className="TaggedInput"
        selected={data}
        options={data}
        onSearchInputChange={(event, { select }) => {
          this.handleOptionsChange(event.target.value, select);
          if (onSearchInputChange) {
            onSearchInputChange((event, { select }));
          }
        }}
        {...rest}
      />
    );
  }
}

export default class TaggedInputDemo extends Component {
  state = {
    urls: [],
  };

  handleChange = ({ data }) => {
    this.setState({ urls: data });
  };

  render() {
    return (
      <div className="demo">
        <h3>Tagged Input Component</h3>
        <TaggedInput data={this.state.urls} onChange={this.handleChange} />
      </div>
    );
  }
}
