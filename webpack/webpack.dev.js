const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  entry: ['@babel/polyfill', './src/index.jsx'],
  mode: 'development',
  target: 'web',
  ignoreWarnings: [(warning) => true],
  devtool: 'source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 9000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    compress: false,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js)$/i,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx)$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
});
