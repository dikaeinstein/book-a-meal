import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const env = process.env.NODE_ENV;

/**
 * Setup webpackDevServer and webpackHotMiddleware(HMR)
 *
 * @param {Object} app Express app
 *
 * @returns {String} Root path to serve client static files from
 */
const setupWebpackDev = (app) => {
  // Load webpack config
  if (env === 'development' || env === 'e2e') {
    /* eslint global-require: 0 */
    const config = require('../../webpack.dev');
    const compiler = webpack(config);
    // Tell express to use the webpack-dev-middleware
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: config.devServer.contentBase,
      hot: config.devServer.hot,
      historyApiFallback: config.devServer.historyApiFallback,
    }));

    app.use(webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
    }));

    return '../client/dist';
  }

  return '../../client/dist';
};

export default setupWebpackDev;
