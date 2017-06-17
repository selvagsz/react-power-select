import React, { Component } from 'react'
import { TypeAhead } from 'src'
import { countries } from '../constants'

const CustomOptionComponnet = ({ option }) => (
  <div>
    <img className="flag" src={option.flag} />
    {option.name} ({option.code})
  </div>
)

export default class ArrayOfObjectsDemo extends Component {
  state = {
    selectedCountry: null
  }

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option })
  }

  render() {
    return (
      <div className="demo">
        <h3>Array of Objects</h3>
        <TypeAhead
          options={countries}
          selected={this.state.selectedCountry}
          optionLabelPath="name"
          optionComponent={<CustomOptionComponnet />}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
