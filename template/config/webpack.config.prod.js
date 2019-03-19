const webpack = require('webpack');
const path = require('path');
const debug = require('debug')('app:webpack:config');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = require('./rules');
const optimization = require('./optimization');
const {
  __NODE_ENV__,
  __DEV__,
  __PROD__,
  __TEST__,
  env,
  appPublicPath,
  appIndexJs,
  appHtml,
  appBuildPath
} = require('./globals');

const createConfig = () => {
  debug('creating configuration');
  debug(`enabling devTools for ${__NODE_ENV__} mode`);

  const webpackConfig = {
    entry: ['babel-polyfill', appIndexJs,],
    mode: env.production,
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true,
    },
    module: {
      rules: [...rules],
    },
    ...optimization,
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json'],
    },

  };

  webpackConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };

  webpackConfig.output = {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    path: appBuildPath,
    publicPath: '/',
  };

  debug(`Enable plugins for '${__NODE_ENV__} Mode!'`);

  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      __DEV__,
      __PROD__,
      __TEST__,
    }),
    ...[
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: appHtml,
        filename: 'index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true,
        },
        chunksSortMode: 'auto',
      }),
    ],
  ];
  debug(`Webpack Bundles is Ready for '${__NODE_ENV__} Mode!'`);
  return webpackConfig;
};
module.exports = createConfig();
