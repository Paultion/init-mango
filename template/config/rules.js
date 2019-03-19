const { __PROD__ } = require('./globals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [/*{
  enforce: 'pre',
  test: /\.(js|jsx)?$/,
  exclude: /(node_modules)/,
  loader: 'eslint-loader',
  options: {
    quiet: true,
  },
},*/ {
  test: /\.html$/,
  use: {
    loader: 'html-loader',
  },
}, {
  test: /\.(js|jsx|ts|tsx)?$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
}, {
  type: 'javascript/auto',
  test: /\.json$/,
  loader: 'json-loader',
}, {
  test: /.scss$/,
  use: [
    __PROD__ ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      /*options: {
        importLoaders: 2,
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
      },*/
    },
    'postcss-loader',
    'sass-loader',
  ],
}, {
  test: /.css$/,
  use: [
    __PROD__ ? MiniCssExtractPlugin.loader : 'style-loader',
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
}];
