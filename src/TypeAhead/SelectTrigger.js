import React, { Component } from 'react'

export default (props) => {
  let {
    selectedOption,
    selectedLabel,
    placeholder,
    disabled,
    onClick,
    handleOnChange,
    handleKeyDown,
    handleOnFocus,
    handleOnBlur,
  } = props

  let value = props.searchTerm

  if (value === null) {
    value = ''
    if (selectedOption) {
      if (typeof selectedLabel === 'function') {
        value = selectedLabel(selectedOption)
      } else {
        value = selectedOption[selectedLabel]
      }
    }
  }

  return (
    <div
      className='powerselect__trigger'
      onClick={onClick}
    >
      <input
        className='powerselect__trigger-input'
        autoComplete='off'
        spellCheck='false'
        placeholder={props.placeholder}
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <span
        className='powerselect__trigger-status'
      ></span>
    </div>
  )
}
