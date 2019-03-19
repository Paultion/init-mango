const path = require('path');
const fs = require('fs-extra');

const env = {
  test: 'test',
  development: 'development',
  production: 'production',
};
exports.env = env;

exports.__TEST__ = process.env.NODE_ENV === env.test;
exports.__DEV__ = process.env.NODE_ENV === env.development;
exports.__PROD__ = process.env.NODE_ENV === env.production;
exports.__NODE_ENV__ = process.env.NODE_ENV;
exports.export = __PORT__ = process.env.PORT;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

Object.assign(exports, {
  appMainPath: resolveApp('src'),
  appPublicPath: resolveApp('public'),
  appBuildPath: resolveApp('dist'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  yarnLockFile: resolveApp('yarn.lock'),
  packageJsonFile: resolveApp('package.json'),
  nodeModuleFolder: resolveApp('node_modules'),
});
