const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

const devMode = process.env.NODE_ENV;

module.exports = {
  entry: ['./client/src/index.js',
    devMode === 'development'
      ? 'webpack-hot-middleware/client?path=/__webpack_hmr'
      : null].filter(ent => ent !== null),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        exclude: ['node_modules', 'dist'],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', 'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebPackPlugin({
      template: './client/src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
