const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC_DIR = `${__dirname}/src`
const DIST_DIR = `${__dirname}/dist`

module.exports = {
  context: SRC_DIR,
  entry: {
    main: './index.js'
  },
  output: {
    path: `${DIST_DIR}/`,
    filename: 'react-power-select.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('react-power-select.css')
  ]
}
