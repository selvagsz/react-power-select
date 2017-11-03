# react-power-select
A highly composable &amp; reusable select components

[![npm version](https://badge.fury.io/js/react-power-select.svg)](https://www.npmjs.com/package/react-power-select)
[![Build Status](https://travis-ci.org/selvagsz/react-power-select.svg?branch=master)](https://travis-ci.org/selvagsz/react-power-select)
[![Coverage Status](https://coveralls.io/repos/github/selvagsz/react-power-select/badge.svg?branch=master)](https://coveralls.io/github/selvagsz/react-power-select)

### DEMO https://selvagsz.github.io/react-power-select/

# Installation

```bash
npm i react-power-select --save
```

Import the CSS in your bundle

```js
import 'react-power-select/dist/react-power-select.css'
```

# Usage

```js
import React, { Component } from 'react'
import { PowerSelect } from 'react-power-select'

export default class Demo extends Component {
  state = {};

  handleChange = ({ option }) => {
    this.setState({
      selectedOption: option
    })
  }

  render() {
    return (
      <PowerSelect
        options={['React', 'Ember', 'Angular', 'Vue', 'Preact', 'Inferno']}
        selected={this.state.selectedOption}
        onChange={this.handleChange}
      />
    )
  }
}
```


## Credits

Hat tip to [ember-power-select's](https://github.com/cibernox/ember-power-select) [architecture](http://www.ember-power-select.com/EPS_disected-48ad0d36e579a5554bff1407b51c554b.png)
