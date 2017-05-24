import React, { Component } from 'react'
import { render } from 'react-dom'
import PowerSelect from 'src/PowerSelect'
import './index.scss'
import 'src/styles/PowerSelect'


{/*
  <PowerSelect
    options={options}
    selected={selected}
    onChange={this.handleChange}
  />
*/}

class App extends Component {
  state = {
    selectedFramework: 'React'
  }

  frameworks = ['React', 'Ember', 'Angular', 'Vue', 'Preact']

  handleChange = (option) => {
    this.setState({
      selectedFramework: option
    })
  }

  render() {
    return (
      <div className="container">
        <PowerSelect
          options={this.frameworks}
          selected={this.state.selectedFramework}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
