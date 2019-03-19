const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
    },
    minimizer: [
      new UglifyJsPlugin({
        /*compress: {
          unused: true,
          dead_code: true,
          warnings: false,
        },*/
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  performance: {
    hints: false,
  },
};
