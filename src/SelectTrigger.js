import React, { Component } from 'react'

export default (props) => {
  let { selectedOption, selectedLabel, placeholder, onClick } = props
  let SelectedOptionComponent = props.selectedOptionComponent

  return (
    <div className='trigger' onClick={onClick}>
      {
        selectedOption ?
        <SelectedOptionComponent
          selectedLabel={selectedLabel}
          option={selectedOption}
        /> :
        <span className='power-select-placeholder'>{placeholder}</span>
      }
    </div>
  )
}
