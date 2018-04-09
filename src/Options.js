import React, { Component } from 'react';
import cx from 'classnames';
import Option from './Option';
import { getOptionIndex, isOptGroup } from './utils';

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
    if (highlightedOption) {
      let optionIndex = getOptionIndex(options, highlightedOption);
      let $option = this.optionsList.querySelector(`[data-option-index="${optionIndex}"]`);
      let delta = 0;
      if ($option) {
        let $optionOffsetHeight = $option.offsetHeight;
        let $optionOffsetTop = $option.offsetTop;
        delta = $optionOffsetTop + $optionOffsetHeight - this.optionsListOffsetHeight;
      }
      if (delta > 0) {
        this.optionsList.scrollTop = delta;
      } else {
        this.optionsList.scrollTop = 0;
      }
    }
  }

  // renderOptions(options, optGroupDisabled = false) {
  //   let { select, optionLabelPath, optionComponent, highlightedOption, onOptionClick } = this.props;
  //   return options.map((option, index) => {
  //     let optionIndex = getOptionIndex(this.props.options, option);
  //     if (isOptGroup(option)) {
  //       return (
  //         <div
  //           key={index}
  //           data-group-index={optionIndex}
  //           className={cx('PowerSelect__OptGroup', {
  //             'PowerSelect__OptGroup--disabled': !!option.disabled,
  //           })}
  //         >
  //           <div className="PowerSelect__OptGroup__Label">{option.label}</div>
  //           {this.renderOptions(option.options, option.disabled)}
  //         </div>
  //       );
  //     }
  //     return (
  //       <Option
  //         key={index}
  //         optionIndex={optionIndex}
  //         option={option}
  //         select={select}
  //         disabled={optGroupDisabled}
  //         optionLabelPath={optionLabelPath}
  //         optionComponent={optionComponent}
  //         isHighlighted={option === highlightedOption}
  //         onOptionClick={() => {
  //           onOptionClick(option);
  //         }}
  //       />
  //     );
  //   });
  // }

  renderOptions() {
    let { children, options, highlightedOption, onOptionClick } = this.props;
    return React.Children.map(children, (child, index) => {
      let optionIndex = getOptionIndex(options, options[index]);
      if (child === null) {
        return null;
      }

      if (child.type === Option) {
        return React.cloneElement(child, {
          ...child.props,
          isHighlighted: child.props.option === highlightedOption,
          optionIndex,
          onOptionClick,
        });
      }

      return child;
    });
  }

  render() {
    return (
      <div className="PowerSelect__Options" ref={optionsList => (this.optionsList = optionsList)}>
        {this.renderOptions()}
      </div>
    );
  }
}
