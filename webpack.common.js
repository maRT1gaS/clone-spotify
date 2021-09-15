const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new StylelintPlugin({
      configFile: './.stylelintrc.json',
      extensions: 'css',
      fix: true,
    }),
    new EslintWebpackPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
      lintDirtyModulesOnly: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/assets/favicons/',
          to: 'assets/favicons',
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|git|svg)$/i,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    ],
  },
};
