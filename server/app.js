import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import routes from './routes';

dotenv.config();

// Set up express app
const app = express();

const port = process.env.PORT || 5000;

// Load API documentation
const swaggerDocument = YAML.load('swagger.yml');
console.log(process.env.NODE_ENV);
// Load webpack config
if (process.env.NODE_ENV === 'development') {
  /* eslint global-require: 0 */
  const config = require('../webpack.dev');
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
}

// Enable CORS Pre-Flight on all routes
app.use(cors());

// Log incoming requests
app.use(logger('combined'));

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve API docs
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);

app.get('*', (req, res) => (
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
));

// Catch all error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    message: 'Something failed, we are working on it :)',
    status: 'error',
  });
});

/* eslint no-console: 0 */
// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
