const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const {
  appIndexJs,
  appMainPath,
  packageJsonFile,
  appHtml,
  env,
} = require('./globals');

const publicPath = '/';

module.exports = {
  mode: env.development,
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    require.resolve('react-dev-utils/webpackHotDevClient'),
    appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'babel-runtime': path.dirname(
        require.resolve('babel-runtime/package.json'),
      ),
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(appMainPath, [packageJsonFile]),
    ],
  },
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)?$/,
      include: appMainPath,
      loader: 'babel-loader',
    }, {
      type: 'javascript/auto',
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }, {
      test: /.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]',
          },
        },
        // 'postcss-loader',
      ],
    }, {
      test: /\.woff(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
    }, {
      test: /\.otf(\?.*)?$/,
      loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype',
    }, {
      test: /\.ttf(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?.*)?$/,
      loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]',
    }, {
      test: /\.svg(\?.*)?$/,
      loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appHtml,
      filename:'index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  performance: {
    hints: false,
  },
};
