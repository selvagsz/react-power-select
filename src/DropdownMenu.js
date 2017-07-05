import React, { Component, isValidElement, cloneElement } from 'react';
import Options from './Options';

const renderComponent = (Component, props) => {
  if (isValidElement(Component)) {
    return cloneElement(Component, props);
  }

  if (Component) {
    return <Component {...props} />;
  }
};

export default class DropdownMenu extends Component {
  render() {
    let {
      select,
      handleKeyDown,
      highlightedOption,
      minWidth,
      beforeOptionsComponent,
      afterOptionsComponent,
      ...otherProps
    } = this.props;

    return (
      <div
        className="PowerSelect__Menu"
        tabIndex="1"
        onKeyDown={event => handleKeyDown(event, highlightedOption)}
        style={{
          minWidth: `${minWidth}px`,
        }}
      >
        {beforeOptionsComponent &&
          renderComponent(beforeOptionsComponent, { select })}

        <Options
          select={select}
          highlightedOption={highlightedOption}
          {...otherProps}
        />

        {afterOptionsComponent &&
          renderComponent(afterOptionsComponent, { select })}
      </div>
    );
  }
}
