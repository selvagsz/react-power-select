import React, { isValidElement, cloneElement } from 'react'

export default ({ option, optionLabelPath, optionComponent, select }) => {
  let OptionComponent = optionComponent

  if (isValidElement(OptionComponent)) {
    return cloneElement(OptionComponent, {
      option,
      select
    })
  }

  if (OptionComponent) {
    return <OptionComponent option={option} select={select} />
  }

  if (typeof option === 'object') {
    if (optionLabelPath) {
      return <span>{option[optionLabelPath]}</span>
    }
  }

  if (typeof option === 'string') {
    return <span>{option}</span>
  }

  return null
}
