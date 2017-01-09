import React, { Component } from 'react'

export default ({ option, selectedLabel }) => {
  return (
    <span className='powerselect__trigger-label'>
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
