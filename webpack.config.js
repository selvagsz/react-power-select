const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC_DIR = `${__dirname}/src`
const DIST_DIR = `${__dirname}/dist`

module.exports = {
  context: SRC_DIR,
  resolve: {
    extensions: ['.js', '.scss']
  },
  entry: {
    main: './index.js',
  },
  output: {
    path: `${DIST_DIR}/`,
    filename: 'react-power-select.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['es2015', 'react', 'stage-0'],
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    new ExtractTextPlugin({
      filename: 'react-power-select.css'
    }),
  ]
}
