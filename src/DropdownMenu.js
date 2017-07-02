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
      highlightedIndex,
      minWidth,
      beforeOptionsComponent,
      afterOptionsComponent,
      ...otherProps
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

        <Options
          select={select}
          highlightedIndex={highlightedIndex}
          {...otherProps}
        />

        {afterOptionsComponent &&
          renderComponent(afterOptionsComponent, { select })}
      </div>
    );
  }
}
