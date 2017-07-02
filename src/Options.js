import React, { Component } from 'react';
import Option from './Option';

export default class Options extends Component {
  componentWillReceiveProps(nextProps) {
    this.scrollTo(nextProps.highlightedIndex);
  }

  componentDidMount() {
    this.optionsListOffsetHeight = this.optionsList.offsetHeight;
    this.stashOptionOffsetHeight();
    this.scrollTo(this.props.highlightedIndex);
  }

  componentDidUpdate() {
    if (!this.optionOffsetHeight) {
      this.stashOptionOffsetHeight();
    }

    if (!this.optionsListOffsetHeight) {
      this.optionsListOffsetHeight = this.optionsList.offsetHeight;
    }
  }

  stashOptionOffsetHeight() {
    let option = document.querySelector('.PowerSelect__Option');
    this.optionOffsetHeight = (option && option.offsetHeight) || 0;
  }

  scrollTo(newHighlightedIndex) {
    if (newHighlightedIndex !== this.props.highlightedIndex) {
      let optionOffsetHeight = this.optionOffsetHeight;
      let delta =
        optionOffsetHeight * newHighlightedIndex +
        optionOffsetHeight -
        this.optionsListOffsetHeight;

      if (delta > 0) {
        this.optionsList.scrollTop = delta;
      } else {
        this.optionsList.scrollTop = 0;
      }
    }
  }

  render() {
    let {
      options,
      select,
      optionLabelPath,
      optionComponent,
      highlightedIndex,
      onOptionClick,
    } = this.props;

    return (
      <div
        className="PowerSelect__Options"
        ref={optionsList => (this.optionsList = optionsList)}
      >
        {options.map((option, index) => {
          return (
            <Option
              key={index}
              option={option}
              select={select}
              optionLabelPath={optionLabelPath}
              optionComponent={optionComponent}
              isHighlighted={highlightedIndex === index}
              onOptionClick={() => {
                debugger;
                onOptionClick(index, option);
              }}
            />
          );
        })}
      </div>
    );
  }
}
