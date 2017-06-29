import React, { Component, isValidElement, cloneElement } from 'react';
import OptionWrapper from './OptionWrapper';

const renderComponent = (Component, props) => {
  if (isValidElement(Component)) {
    return cloneElement(Component, props);
  }

  if (Component) {
    return <Component {...props} />;
  }
};

export default class DropdownMenu extends Component {
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
      onOptionClick,
      handleKeyDown,
      selected,
      optionLabelPath,
      optionComponent,
      select,
      minWidth,
      highlightedIndex,
      beforeOptionsComponent,
      afterOptionsComponent,
    } = this.props;

    return (
      <div
        className="PowerSelect__Menu"
        onKeyDown={event => handleKeyDown(event, highlightedIndex)}
        style={{
          minWidth: `${minWidth}px`,
        }}
      >
        {beforeOptionsComponent &&
          renderComponent(beforeOptionsComponent, { select })}
        <div
          className="PowerSelect__Options"
          ref={optionsList => (this.optionsList = optionsList)}
        >
          {options.map((option, idx) =>
            <OptionWrapper
              key={idx}
              option={option}
              select={select}
              optionLabelPath={optionLabelPath}
              optionComponent={optionComponent}
              isHighlighted={highlightedIndex === idx}
              onOptionClick={() => {
                onOptionClick(idx, option);
              }}
            />
          )}
        </div>
        {afterOptionsComponent &&
          renderComponent(afterOptionsComponent, { select })}
      </div>
    );
  }
}
