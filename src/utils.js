import React, { isValidElement, cloneElement } from 'react';

export const matcher = ({ option, searchTerm = '', searchIndices }) => {
  searchTerm = searchTerm.trim().toLowerCase();

  if (searchIndices) {
    return makeArray(searchIndices).some(index => {
      let value = option[index];
      return (
        !isNone(value) &&
        String(value)
          .toLowerCase()
          .indexOf(searchTerm) !== -1
      );
    });
  }

  return (
    !isNone(option) &&
    String(option)
      .toLowerCase()
      .indexOf(searchTerm) !== -1
  );

  return true;
};

export const isNone = value => value === null || value === undefined;

export const makeArray = obj => {
  if (obj === null || obj === undefined) {
    return [];
  }
  return Array.isArray(obj) ? obj : [obj];
};

export const isOptGroup = option => option.label && option.options;

export const getOptionIndex = (options, option) => {
  let paths = [];
  let optionFound = false;
  (function traverse(options) {
    optionFound = options.some((currentOption, index) => {
      if (currentOption === option) {
        paths.push(index);
        optionFound = true;
        return true;
      }
      if (isOptGroup(currentOption)) {
        paths.push(index);
        return traverse(currentOption.options, index);
      }
    });
    if (!optionFound) {
      paths.pop();
    }
    return optionFound;
  })(options);
  return paths.join('.');
};

export const flattenOptions = options => {
  let isOptGroupOptions = false;
  let optGroupMap = new Map();
  let flattenedOptions = (function traverse(options, flattenedOptions = [], group = {}) {
    return options.reduce((prev, currentOption) => {
      if (isOptGroup(currentOption)) {
        isOptGroupOptions = true;
        return traverse(currentOption.options, prev, currentOption);
      }
      prev.push(currentOption);
      optGroupMap.set(currentOption, group);
      return prev;
    }, flattenedOptions);
  })(options);
  return {
    isOptGroupOptions,
    flattenedOptions,
    optGroupMap,
  };
};

export const filterOptions = ({ options, searchTerm, searchIndices, matcher }) => {
  return (function doFilter(options) {
    let filtered = [];
    for (let i = 0, len = options.length; i < len; i++) {
      let option = options[i];
      if (isOptGroup(option)) {
        let copy = { ...option };
        copy.options = doFilter(option.options);
        if (copy.options.length) {
          filtered.push(copy);
        }
      } else if (matcher({ option, searchTerm, searchIndices })) {
        filtered.push(option);
      }
    }
    return filtered;
  })(options);
};

export const getNextValidOption = ({ options, currentOption, counter, optGroupMap }) => {
  return (function next(currentOption) {
    let currentIndex = options.indexOf(currentOption);
    let nextIndex = currentIndex + counter;
    nextIndex =
      nextIndex === -1 ? options.length - 1 : nextIndex === options.length ? 0 : nextIndex;
    let nextOption = options[nextIndex];
    let group = optGroupMap.get(nextOption);
    if (nextOption && (nextOption.disabled || group.disabled)) {
      return next(nextOption);
    }
    return nextOption;
  })(currentOption);
};

export const isValidOptionPresent = options => {
  return (function traverse(options) {
    return !!options.some(option => {
      if (isOptGroup(option)) {
        return traverse(option.options);
      }
      return !option.disabled;
    });
  })(options);
};

export const renderComponent = (Component, props) => {
  if (isValidElement(Component)) {
    return cloneElement(Component, props);
  }
  if (Component) {
    return <Component {...props} />;
  }
};
