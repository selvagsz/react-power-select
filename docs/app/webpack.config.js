'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const multi = require('multi-loader');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), '.'),
    ],
  },

  resolveLoader: {
    modules: [
      path.resolve(process.cwd(), 'loaders'),
      path.resolve(process.cwd(), 'node_modules'),
    ],
  },

  module: {},
};

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  app: './docs/app/index.js',
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  path: path.resolve(process.cwd(), 'docs'),
  filename: '[name].js',
};

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: multi('snippet-loader', 'babel-loader'),
      },
    ],
  },

  {
    test: /\.(css|scss)$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
];

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.ProvidePlugin({
    React: 'react',
  }),

  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //   },
  //   output: {
  //     comments: false,
  //   },
  // }),

  new HtmlWebpackPlugin({
    template: './docs/app/index.html',
  }),
];

module.exports = webpackConfig;
