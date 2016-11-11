import React, { Component } from 'react'

export default ({ option, selectedLabel }) => {
  return (
    <span>
      {
        typeof selectedLabel === 'function' ?
          selectedLabel(option) :
          typeof selectedLabel === 'string' ?
              option[selectedLabel] :
              option
      }
    </span>
  )
}
