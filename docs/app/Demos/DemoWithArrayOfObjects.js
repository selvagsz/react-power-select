import React, { Component } from 'react'
import PowerSelect from 'src/PowerSelect'

export default class DemoWithArrayOfObjects extends Component {
  state = {
    selectedCountry: null
  }

  countries = [
  {
    "name": "Argentina",
    "code": "ARG",
    "flag": "https://restcountries.eu/data/arg.svg"
  },
  {
    "name": "Brazil",
    "code": "BRA",
    "flag": "https://restcountries.eu/data/bra.svg"
  },
  {
    "name": "Canada",
    "code": "CAN",
    "flag": "https://restcountries.eu/data/can.svg"
  },
  {
    "name": "China",
    "code": "CHN",
    "flag": "https://restcountries.eu/data/chn.svg"
  },
  {
    "name": "India",
    "code": "IND",
    "flag": "https://restcountries.eu/data/ind.svg"
  },
  {
    "name": "Japan",
    "code": "JPN",
    "flag": "https://restcountries.eu/data/jpn.svg"
  },
  {
    "name": "Portugal",
    "code": "PRT",
    "flag": "https://restcountries.eu/data/prt.svg"
  },
  {
    "name": "Russian Federation",
    "code": "RUS",
    "flag": "https://restcountries.eu/data/rus.svg"
  },
  {
    "name": "Spain",
    "code": "ESP",
    "flag": "https://restcountries.eu/data/esp.svg"
  },
  {
    "name": "United Kingdom of Great Britain and Northern Ireland",
    "code": "GBR",
    "flag": "https://restcountries.eu/data/gbr.svg"
  },
  {
    "name": "United States of America",
    "code": "USA",
    "flag": "https://restcountries.eu/data/usa.svg"
  }
]

  handleChange = ({ option }) => {
    this.setState({ selectedCountry: option })
  }

  render() {
    return (
      <div>
        <div className="demo">
          <h3>Array of Objects</h3>
          <PowerSelect
            options={this.countries}
            selected={this.state.selectedCountry}
            optionLabelPath="name"
            onChange={this.handleChange}
          />
        </div>

        <div className="demo">
          <h3>Search Fields</h3>
          <PowerSelect
            options={this.countries}
            selected={this.state.selectedCountry}
            optionLabelPath="name"
            searchIndices={["name", "code"]}
            onChange={this.handleChange}
          />
        </div>

        <div className="demo">
          <h3>Custom Option Component</h3>
          <PowerSelect
            options={this.countries}
            selected={this.state.selectedCountry}
            optionComponent={({ option }) => (
              <div>
                <img className="flag" src={option.flag} />
                {option.name} ({option.code})
              </div>
            )}
            searchIndices={["name", "code"]}
            onChange={this.handleChange}
          />
        </div>

        <div className="demo">
          <h3>Custom Selected Option Component</h3>
          <PowerSelect
            options={this.countries}
            selected={this.state.selectedCountry}
            selectedOptionComponent={({ option }) => (
              <b style={{color: "orange"}}>
                <img className="flag" src={option.flag} />
                {option.name} ({option.code})
              </b>
            )}
            optionComponent={({ option }) => (
              <div>
                <img className="flag" src={option.flag} />
                {option.name} ({option.code})
              </div>
            )}
            searchIndices={["name", "code"]}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
