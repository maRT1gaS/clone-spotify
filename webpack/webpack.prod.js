const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/index.jsx',
  },
  mode: 'production',
  output: {
    clean: true,
  },
  target: 'browserslist',
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              implementation: require('postcss'),
              postcssOptions: {
                config: path.resolve('./postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
});
