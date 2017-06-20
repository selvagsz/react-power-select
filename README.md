# react-power-select
A highly composable &amp; reusable select components

### DEMO https://selvagsz.github.io/react-power-select/

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


### Credits

Hat tip to [ember-power-select's](https://github.com/cibernox/ember-power-select) [architecture](http://www.ember-power-select.com/EPS_disected-48ad0d36e579a5554bff1407b51c554b.png)
