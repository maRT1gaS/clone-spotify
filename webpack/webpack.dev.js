const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  ignoreWarnings: [(warning) => true],
  devtool: 'eval-source-map',
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
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
});
