# react-power-select
A highly composable &amp; reusable select components

# Installation

```bash
npm i react-power-select --save
```

# Usage

```js
import { PowerSelect } from 'react-power-select'

export default class FooBar {
  constructor() {
    super(...arguments)
    this.handleChange = ::this.handleChange
    this.state = {
      selectedOption: null
    }
  }
  
  handleChange({ option }) {
    this.setState({
      selectedOption: option
    })
  }

  render() {
    return (
      <PowerSelect
        options={[]}
        selected={this.state.selectedOption}
        selectedLabel='name'
        placeholder='Select a customer'
        onChange={this.handleChange}
      />
    )
  }
}
```
