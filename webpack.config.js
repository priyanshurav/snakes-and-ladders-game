const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

if (NODE_ENV !== 'development' && NODE_ENV !== 'production')
  throw new Error("'NODE_ENV' must be either 'development' or 'production'");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.ts',
  mode: isDev ? 'development' : 'production',
  devServer: !isDev
    ? undefined
    : {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        open: true,
        hot: true,
        inline: true,
        compress: true,
        watchContentBase: true,
      },
  optimization: isDev
    ? undefined
    : {
        minimize: true,
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
  devtool: isDev ? 'source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'awesome-typescript-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './static/assets/',
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
  output: {
    filename: './static/js/main.[hash].js',
    path: path.join(__dirname, 'build'),
  },
  plugins: [
    new CheckerPlugin(),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: './static/css/main.[hash].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/*',
          to: '.',
          flatten: true,
        },
        {
          flatten: true,
          from: './public/icons/*',
          to: 'icons',
        },
      ],
    }),
  ],
};
