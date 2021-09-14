const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader", 
          "css-loader", 
          "postcss-loader",
        ],
      },
    ]
  }
})