const fs = require('fs-extra');
const debug = require('debug')('app:build:webpack-compiler');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.prod');
const { appBuildPath } = require('../config/globals');

fs.emptyDirSync(appBuildPath);

function webpackCompiler() {
  return new Promise((resolve, reject) => {

    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler got an error', err);
        reject(err);
      }
      // let statsJson = null;
      if (stats) statsJson = stats.toJson();

      debug('Webpack compilation is completed.');
      resolve(statsJson);
    });
  });
}

const compiler = () => {
  debug('Starting compiler');

  return Promise.resolve()
    .then(() => webpackCompiler())
    .then(() => {
      debug('Compilation completed successfully');
    })
    .catch(err => {
      debug('Compiler got an error', err);

      process.exit(1);
    });
};

compiler();
