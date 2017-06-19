# react-power-select
A highly composable &amp; reusable select components

# Installation

```bash
npm i react-power-select --save
```

# Usage

```js
import { PowerSelect } from 'react-power-select'

export default class Demo {
  state = {};
  
  handleChange({ option }) {
    this.setState({
      selectedOption: option
    })
  }

  render() {
    return (
      <PowerSelect
        options={['React', 'Ember', 'Angular', 'Vue', 'Preact', 'Inferno']}
        selected={this.state.selectedOption}
        placeholder='Select a customer'
        onChange={this.handleChange}
      />
    )
  }
}
```
