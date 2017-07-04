import React, { Component } from 'react';
import Option from './Option';
import { getOptionIndex } from './utils';

export default class Options extends Component {
  componentWillReceiveProps({ options, highlightedOption }) {
    this.scrollTo({ options, highlightedOption });
  }

  componentDidMount() {
    let { options, highlightedOption } = this.props;
    this.optionsListOffsetHeight = this.optionsList.offsetHeight;
    this.scrollTo({ options, highlightedOption });
  }

  componentDidUpdate() {
    if (!this.optionsListOffsetHeight) {
      this.optionsListOffsetHeight = this.optionsList.offsetHeight;
    }
  }

  scrollTo({ options, highlightedOption }) {
    if (
      highlightedOption &&
      highlightedOption !== this.props.highlightedOption
    ) {
      let optionIndex = getOptionIndex(options, highlightedOption);
      let $option = this.optionsList.querySelector(
        `[data-option-index="${optionIndex}"]`
      );
      let $optionOffsetHeight = $option.offsetHeight;
      let $optionOffsetTop = $option.offsetTop;

      let delta =
        $optionOffsetTop + $optionOffsetHeight - this.optionsListOffsetHeight;

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
      highlightedOption,
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
              optionIndex={index}
              option={option}
              select={select}
              optionLabelPath={optionLabelPath}
              optionComponent={optionComponent}
              isHighlighted={option === highlightedOption}
              onOptionClick={() => {
                onOptionClick(index, option);
              }}
            />
          );
        })}
      </div>
    );
  }
}
