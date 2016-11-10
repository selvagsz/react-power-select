import React, { Component } from 'react'

export default (props) => {
  return (
    <div className='trigger' onClick={props.onClick}>
      {
        props.value ?
        <span>{props.value}</span>:
        <span className='placeholder'>{props.placeholder}</span>
      }
    </div>
  )
}
