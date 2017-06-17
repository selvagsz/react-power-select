'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  context: process.cwd(),
  resolve: {
    alias: {
      react: path.resolve(process.cwd(), 'node_modules/react'),
      'react-dom': path.resolve(process.cwd(), 'node_modules/react-dom'),
    },
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), '.'),
    ],
    extensions: ['.js', '.jsx', '.scss'],
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
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
    ],
  },

  {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
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

  new HtmlWebpackPlugin({
    template: './docs/app/index.html',
  }),
];

module.exports = webpackConfig;
