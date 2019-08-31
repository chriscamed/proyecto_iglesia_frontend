const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:9000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',

    'babel-polyfill',

    `${__dirname}/src/index.jsx`,
  ],
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ['node_modules', 'src'],
  },
  node: { fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js|jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options:
            {
              presets: ['@babel/react', '@babel/preset-env'],
              env: {
                development: {
                  plugins: ['@babel/proposal-class-properties'],
                },
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css|sass|scss?$/,
        loader: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/templates/index.template.html`,
    }),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new MiniCSSExtractPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 9000,
    historyApiFallback: true,
    inline: true,
    hot: true,
  },
};
