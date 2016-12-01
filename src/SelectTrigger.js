import React, { Component } from 'react'

export default (props) => {
  let { selectedOption, selectedLabel, placeholder, onClick } = props
  let SelectedOptionComponent = props.selectedOptionComponent

  return (
    <div className='powerselect__trigger' onClick={onClick}>
      {
        selectedOption ?
        <SelectedOptionComponent
          selectedLabel={selectedLabel}
          option={selectedOption}
        /> :
        <span className='powerselect__placeholder'>{placeholder}</span>
      }
      <span className='powerselect__trigger-status'></span>
    </div>
  )
}
