import React, { Component } from 'react'
import TetherComponent from 'react-tether'

export default class Dropdown extends Component {
  render() {
    return (
      <TetherComponent
        attachment='top left'
        targetAttachment='bottom left'
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        {this.props.children}
      </TetherComponent>
    )
  }
}
