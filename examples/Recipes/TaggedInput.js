import React, { Component } from 'react';
import { PowerSelectMultiple } from 'src';

// Hide the caret via CSS

// .TaggedInput {
//   // Hides the caret
//   .PowerSelect__TriggerStatus {
//     display: none;
//   }

//   // Removes the padding allocated for caret
//   .PowerSelectMultiple__SelectedOptions {
//     padding-right: 0;
//   }
// }

// TaggedInput Component - composed on top of PowerSelectMultiple
class TaggedInput extends Component {
  handleChange = ({ options, select }) => {
    this.props.onChange({
      items: options,
      select,
    });
  };

  handleSearchInputChange = (value, select) => {
    if (value.length > 1 && value.charAt(value.length - 1) === ',') {
      let items = this.props.items.slice();
      items.push(value.slice(0, -1));

      this.props.onChange({
        items,
        select,
      });

      select.actions.search('');
      select.actions.focus();
    }
  };

  render() {
    let { items, onChange, onSearchInputChange, ...rest } = this.props;
    return (
      <PowerSelectMultiple
        className="TaggedInput"
        selected={items}
        options={items}
        onChange={this.handleChange}
        onSearchInputChange={(event, { select }) => {
          this.handleSearchInputChange(event.target.value, select);
          if (onSearchInputChange) {
            onSearchInputChange((event, { select }));
          }
        }}
        {...rest}
      />
    );
  }
}

TaggedInput.defaultProps = {
  items: [],
};

export default class TaggedInputDemo extends Component {
  state = {
    urls: [],
  };

  handleChange = ({ items }) => {
    this.setState({ urls: items });
  };

  render() {
    return (
      <TaggedInput
        items={this.state.urls}
        onChange={this.handleChange}
        placeholder="Enter your site urls; separated by comma"
      />
    );
  }
}
